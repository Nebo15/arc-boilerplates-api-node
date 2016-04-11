import UserModel from '../models/user';

export let createUser = (req, res) => {
  UserModel.register(
    new UserModel({username: req.body.username}),
    req.body.password,
    (err, user) => {
      if (err) {
        res.status(500).json({error: err});
      }
      user.save((err, user) => {
        res.status(200).json({status: 'Registration Successful!'});
      });
    }
  );
};

export let logoutUser = (req, res) => {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
};
