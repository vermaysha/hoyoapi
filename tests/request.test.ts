import { HTTPRequest, HoyoAPIError, LanguageEnum } from '../src'
import test from 'ava'
import nock from 'nock'
import { brotliCompressSync, deflateSync, gzipSync } from 'zlib'
const expectedResponse = {
  data: 'valid',
  message: 'success',
  retcode: 0,
}

test('Request must included cookies when parameter have cookies', (t) => {
  t.assert(new HTTPRequest('cookies'))
})

test('setReferer() should return HTTPRequest Object', (t) => {
  const req = new HTTPRequest()

  t.deepEqual(req.setReferer('https://httpbin.org'), req)
})

test('setBody() should return HTTPRequest Object', (t) => {
  const req = new HTTPRequest()

  t.deepEqual(req.setBody({ test: 'test' }), req)
})

test('setQueryParams() should return HTTPRequest Object', (t) => {
  const req = new HTTPRequest()

  t.deepEqual(req.setQueryParams({ test: 'test' }), req)
})

test('setDs() should return HTTPRequest Object', (t) => {
  const req = new HTTPRequest()

  t.deepEqual(req.setDs(true), req)
})

test('setLang() should return HTTPRequest Object', (t) => {
  const req = new HTTPRequest()

  t.deepEqual(req.setLang(LanguageEnum.INDONESIAN), req)
})

test('send() should return valid response', async (t) => {
  nock('https://example.com').post('/').query(true).reply(200, {})

  const req = new HTTPRequest()
  req.setQueryParams({
    query: '1',
  })
  req.setBody({
    body: 1,
  })
  req.setDs()
  const res = await req.send('https://example.com?res', 'POST')

  t.deepEqual(res.response, {
    data: null,
    message: '',
    retcode: -1,
  })
  nock.restore()
})

test('send() should throw HoyoAPIError', async (t) => {
  nock('https://example.com')
    .get('/')
    .query(true)
    .reply(() => {
      return [500, 'Error']
    })

  const req = new HTTPRequest()
  await t.throwsAsync(
    async () => {
      await req.send('https://example.com')
    },
    {
      instanceOf: HoyoAPIError,
    },
  )
  nock.restore()
})

test('send() should valid when decompress brotli compressed data', async (t) => {
  nock('https://example.com')
    .get('/')
    .query(true)
    .reply(() => {
      return [
        200,
        brotliCompressSync(Buffer.from(JSON.stringify(expectedResponse))),
        {
          'content-encoding': 'br',
          'content-type': 'application/json',
        },
      ]
    })

  const req = new HTTPRequest()
  const res = await req.send('https://example.com')

  t.deepEqual(res.response, expectedResponse)

  nock.restore()
})

test('send() should valid when decompress deflate compressed data', async (t) => {
  nock('https://example.com')
    .get('/')
    .query(true)
    .reply(() => {
      return [
        200,
        deflateSync(Buffer.from(JSON.stringify(expectedResponse))),
        {
          'content-encoding': 'deflate',
          'content-type': 'application/json',
        },
      ]
    })

  const req = new HTTPRequest()
  const res = await req.send('https://example.com')

  t.deepEqual(res.response, expectedResponse)

  nock.restore()
})

test('send() should valid when decompress gzip compressed data', async (t) => {
  nock('https://example.com')
    .get('/')
    .query(true)
    .reply(() => {
      return [
        200,
        gzipSync(Buffer.from(JSON.stringify(expectedResponse))),
        {
          'content-encoding': 'gzip',
          'content-type': 'application/json',
        },
      ]
    })

  const req = new HTTPRequest()
  const res = await req.send('https://example.com')

  t.deepEqual(res.response, expectedResponse)

  nock.restore()
})

test('send() should throw HoyoAPIError when JSON response is invalid', async (t) => {
  nock('https://example.com')
    .get('/')
    .query(true)
    .reply(() => {
      return [
        200,
        'Invalid JSON',
        {
          'content-type': 'application/json',
        },
      ]
    })

  const req = new HTTPRequest()

  await t.throwsAsync(
    async () => {
      await req.send('https://example.com')
    },
    {
      instanceOf: HoyoAPIError,
    },
  )

  nock.restore()
})
