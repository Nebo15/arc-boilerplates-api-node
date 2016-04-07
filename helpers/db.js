import mongoose from 'mongoose';
import config from './../config/config.js';

export default {
  connect: () => {
    mongoose.connect(config.db.connection);
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      // we're connected!
      console.log("Connected correctly to server");
    });
  }
};
