/**
 * Module dependencies.
 */
import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

/**
 * Schema definitions.
 */
let User = new mongoose.Schema({
  email: {type: String, default: ''}
});

User.plugin(passportLocalMongoose);
export let userModel = mongoose.model('User', User);

export let getUserOauth2 = (username, password, callback) => {
  console.log('in getUser (username: ' + username + ', password: ' + password + ')');
  userModel.findByUsername(username, (err, user) => {
    if (err) {
      return callback(err);
    }
    if (!user) {
      return callback(null, false);
    }
    user.authenticate(password, (err, user) => {
      if (user) {
        return callback(null, user);
      } else {
        return callback(null, false);
      }
    });
  });
};
