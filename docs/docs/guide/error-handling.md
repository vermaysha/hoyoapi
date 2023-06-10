# Error Handling

The @vermaysha/hoyolab library provides error handling through the `HoyolabError` class, which is used to represent an error that can occur during interactions with the Hoyolab API.

When an error occurs, an instance of the `HoyolabError` class is thrown, which contains the name and message associated with the error. The class extends the built-in `Error` class and provides additional functionality such as capturing the stack trace of the error instance.

To use the `HoyolabError` class for error handling, you can catch the thrown error using a `try...catch` block and handle the error accordingly.

Example usage:

```typescript
import { HoyolabError } from '@vermaysha/hoyolab'

try {
  // code that may throw an error
} catch (error: HoyolabError) {
  console.error(`Error occurred: ${error.message}`)
  // handle the error
}
```

It's important to note that while the `HoyolabError` class can be used for error handling, it's also recommended to handle errors that may occur during interactions with the Hoyolab API by checking the response status codes and data returned by the API.
