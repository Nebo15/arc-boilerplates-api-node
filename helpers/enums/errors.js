/**
 * This file contains all possible response errors. There should be no places in the entire application,
 * where you return error directly, without using res.setError with appropriate error enumerator.
 *
 * This approach helps to automatically build docs, to return well-structured self-descriptive errors,
 * and to encapsulate error texts in a single file.
 */

export const ERRORS = {
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
