# Error Handling

The hoyoapi library provides error handling through the `HoyoAPIError` class, which is used to represent an error that can occur during interactions with the Hoyolab API.

When an error occurs, an instance of the `HoyoAPIError` class is thrown, which contains the name and message associated with the error. The class extends the built-in `Error` class and provides additional functionality such as capturing the stack trace of the error instance.

To use the `HoyoAPIError` class for error handling, you can catch the thrown error using a `try...catch` block and handle the error accordingly.

Example usage:

```typescript
import { HoyoAPIError } from 'hoyoapi'

try {
  // code that may throw an error
} catch (error: HoyoAPIError) {
  console.error(`Error occurred: ${error.message}`)
  // handle the error
}
```

It's important to note that while the `HoyoAPIError` class can be used for error handling, it's also recommended to handle errors that may occur during interactions with the Hoyolab API by checking the response status codes and data returned by the API.
