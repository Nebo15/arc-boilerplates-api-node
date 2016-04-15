import * as validation from '../helpers/validator';

export let getIndex = (req, res) => {
  res.renderJson('user', {"id": 123, name: "Test", avatar: "http://link", hiddenField: "can't see me!"});
};

export let postIndexValidation = {
  "id": "/test",
  "type": "object",
  "properties": {
    "postparam": {"type": "integer"}
  }
};

export let postIndex = (req, res) => {
  validation.validate(postIndexValidation, req.body, res)
    .then(
      () => {
        res.sendJson(req.app.get('config'));
      },
      (err) => validation.defaultReject(err, res)
    );
};
