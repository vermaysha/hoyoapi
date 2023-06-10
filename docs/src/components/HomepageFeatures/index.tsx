/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react'
import clsx from 'clsx'
import styles from './styles.module.css'

type FeatureItem = {
  title: string
  description: JSX.Element
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: (
      <>
        We offers an easy-to-use API that abstracts away the complexities of the
        underlying Hoyolab API. With a few simple function calls, developers can
        retrieve the data they need without worrying about the details of the
        API endpoints.
      </>
    ),
  },
  {
    title: 'Comprehensive',
    description: (
      <>
        We Provides a comprehensive set of APIs to fetch in-game data resources
        of almost all games in the HoYoVerse. This means that developers can
        easily integrate the library with their projects, regardless of which
        game they are working on.
      </>
    ),
  },
  {
    title: 'Built with TypeScript',
    description: (
      <>
        The library is built with TypeScript, which means that type checking is
        performed during development, catching potential errors before runtime.
        By leveraging TypeScript, developers can ensure better code quality and
        maintainability
      </>
    ),
  },
  {
    title: 'Zero Dependency',
    description: (
      <>
        This library is built without using any external dependencies,
        everything is processed optimally to accomplish what needs to be done.
      </>
    ),
  },
  {
    title: 'Support ESM and CJS',
    description: (
      <>
        There is no need to worry about using this library in CJS or ESM
        environments because it supports both of them by default.
      </>
    ),
  },
  {
    title: 'Caching',
    description: (
      <>
        There is no need to worry about caching because in this library, every
        accessed API is automatically handled with an In-Memory Caching system,
        enabling fast and efficient access.
      </>
    ),
  },
]

function Feature({ title, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
