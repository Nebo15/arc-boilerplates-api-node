import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

var User = new mongoose.Schema({
  username: String,
  password: String
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);
