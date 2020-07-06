import mongoose from 'mongoose';

let memberInfoSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  clubInfo: Object,
}, { collection: 'MemberInfo' }); 

memberInfoSchema.statics.findOrCreate = function findOneOrCreate(condition, doc, callback) {
  const self = this;
  self.find(condition, (err, result) => {
    if( result.length == 0 ) {
      //new user
      self.create(doc, (err, result) => {
        return callback(err, result);
      });
    } else {
      //user already exist
      return callback(err, null);
    }
  });
};

let MemberInfo = mongoose.model('MemberInfo', memberInfoSchema);

Object.assign(exports, {
  MemberInfo
});
