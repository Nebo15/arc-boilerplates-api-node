import validator from 'node-validator';

export let validate = (rules, fields) => {
  return new Promise((resolve, reject) => {
    validator.run(
      rules,
      fields,
      function (errorCount, errors) {
        if (errorCount) {
          reject(errors);
        } else {
          resolve();
        }
      });
  });
};
