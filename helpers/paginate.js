export default function paginate(request, callback) {
  let defaults = {
    limit: {
      param_key: 'limit',
      value: 1
    },
    startingAfter: {
      param_key: 'starting_after',
      value: null
    },
    endingBefore: {
      param_key: 'ending_before',
      value: null
    }
  };
  let params = (request.method == 'GET') ? request.query : request.body;
  for (let key in defaults) {
    if (params[defaults[key].param_key] !== null && params.hasOwnProperty(defaults[key].param_key)) {
      defaults[key].value = params[defaults[key].param_key];
    }
  }

  let options = defaults;
  // let query = this;
  if (options.startingAfter.value) {
    this.where('_id').gt(options.startingAfter.value);
  }
  if (options.endingBefore.value) {
    this.where('_id').lt(options.endingBefore.value);
  }

  this.limit(parseInt(options.limit.value)).exec((err, models) => {
    if (err) {
      callback(err, {});
      return;
    }
    callback(err, {models: models || [], paginate: options});
  });
}
