/**
 * This file contains all possible response errors. There should be no places in the entire application,
 * where you return error directly, without using res.setError with appropriate error enumerator.
 *
 * This approach helps to automatically build docs, to return well-structured self-descriptive errors,
 * and to encapsulate error texts in a single file.
 */

export const ERRORS = {
  "OK": {
    message: "OK",
    link: "Docs: https://example.com/#error-codes",
    code: 200
  },
  "CREATED": {
    message: "Created",
    link: "Docs: https://example.com/#error-codes",
    code: 201
  },
  "NOT_MODIFIED": {
    message: "Not modified",
    link: "Docs: https://example.com/#error-codes",
    code: 304
  },
  "BAD_REQUEST": {
    message: "Bad request",
    link: "Docs: https://example.com/#error-codes",
    code: 400
  },
  "UNAUTHORIZED": {
    message: "Unauthorized",
    link: "Docs: https://example.com/#error-codes",
    code: 401
  },
  "NOT_FOUND": {
    message: "Not Found",
    link: "Docs: https://example.com/#error-codes",
    code: 404
  },
  "UNPROCESSABLE_ENTITY": {
    message: "Unprocessable Entity",
    link: "Docs: https://example.com/#error-codes",
    code: 422
  },
  "SERVER_ERROR": {
    message: "You have faced a general server error. We are aware of this problem and working to fix it.",
    link: "Docs: https://example.com/#error-codes",
    code: 500
  },
  "CONTENT_TYPE_INVALID": {
    message: "Incorrect content type",
    link: "Docs: https://example.com/#content-types",
    code: 415
  }
};
