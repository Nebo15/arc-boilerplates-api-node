import * as user from '../models/user';

export let createUser = (req, res) => {
  user.userModel.register(
    new user.userModel({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json({error: err});
      } else {
        user.save((err, user) => {
          res.status(200).json({status: 'Registration Successful!'});
        });
      }
    }
  );
};

export let logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
};

export let getUsers = (req, res) => {
  let query = user.model.find({});
  query.paginate(req, function(err, result) {
    res.addPaginate(result.paginate);
    res.sendJson(result.models);
  });
};
