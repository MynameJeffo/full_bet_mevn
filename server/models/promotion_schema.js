import mongoose from 'mongoose';
// import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const promotionSchema = new Schema({
    promotionImage: Buffer,
    promotionText: String
}); 


let Promotion = mongoose.model('promotionModel', promotionSchema);

Object.assign(exports, {
  Promotion
});
