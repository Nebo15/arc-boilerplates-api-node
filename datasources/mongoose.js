import mongoose from 'mongoose';
import config from './../settings/config';
import paginate from './../helpers/paginate';

mongoose.Query.prototype.paginate = paginate;

export default {
  connect: () => {
    mongoose.connect(config.get('db').get('connection'));
    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      console.log("Mongoose: Connected correctly to MongoDB server");
    });
  }
};
