/**
 * Logs an error with contextual information.
 *
 * @param {string} functionName
 * @param {Error|any} error
 */
export const handleError = (functionName, error) => {
  console.error({
    function: functionName,
    message: error?.message || error,
  });
};
