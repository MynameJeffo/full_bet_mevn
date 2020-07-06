// Define your routes
import express from 'express';
import path from 'path';
const cors = require('cors')
const CircularJSON = require('circular-json');
const mongoose = require("mongoose");
const router = express.Router();

// import mongoURL from '../config/config';
import { MemberInfo } from '../models/user_schema';


const url = "mongodb://@ds135777.mlab.com:35777/heroku_ktwzqrjl";

const options = { user: 'tom_db_admin', pass: 'Iamthebest99' };
mongoose.connect(url, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection errorrrr:'));

db.once('open', function() {
    // we're connected!
    console.log("We are connected!");
});

// import { addClubInfoForMember, getAllMemberInfo, updateClubInfo, deleteClubInfo } from "../controllers/user_controller.js" 

// Routes go here.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/auth/login', (req, res) => {
  let reqBody = JSON.parse(CircularJSON.stringify(req.body));
  //check and make sure the email is in the database and match the password
  // or else, send login error 
  //send "OK" on success
  let query = {$and:[
    { "email" : reqBody.email },
    { "password" : reqBody.password }
  ]};
  MemberInfo.find(query, '', (err, memberInfo) => {
    if (err) {
      return next(err);
    }
    if(memberInfo.length == 0) {
      //login failed
      res.send("LOGIN_FAILED")
    } else {
      //login successful
      res.send("LOGIN_SUCCESS");
    }
  });

  // res.send(CircularJSON.stringify(req.body));
});

router.post("/auth/register", (req, res) => {
  //check and make sure the email and name is not in the database or else, send null 
  //if not null, create new member here
  let reqBody = JSON.parse(CircularJSON.stringify(req.body));
  let prettyReqBody = {
    "username" : reqBody.name,
    "email" : reqBody.email,
    "password" : reqBody.password,
    "clubInfo" : {}
  };
  let query = {$or:[
    { "email" : reqBody.email},
    { "username" : reqBody.name}
  ]};

  MemberInfo.findOrCreate(query, prettyReqBody, (err, registerRespond) => {
    console.log("register respond ->", registerRespond);
    res.send(registerRespond);
  });

});

router.get('/getPromotions',(req, res) => {
  //fetch all the promotion campaigns, image, text

  res.send("getPromotions");
});

router.put('/updatePromotions',(req, res) => {
  //handle uploading photos ***big boss
  console.log("req param -> ", req.query.id);
  console.log("req body ->", req.body);
  try{
    MemberInfo.findByIdAndUpdate(req.query.id, { $set: req.body }, (err, promotion) => {
      if (err) {
        console.log("update memberinfo error");
        return next(err);
      }
      res.json(promotion);
      res.end();
    });
  } catch (err) {
    console.log("updateMemberClubInfo failed");
  }
});

router.get('/getMemberInfo',(req, res) => {
  //get all the memberInfo 
  //call it whenever the page refresh, update
  let query = {};
  let concern = {};
  if(req.query.getClubInfo) {
    query = { email : req.query.email };
    concern = { clubInfo:1 };
  }
  try {
    MemberInfo.find(query, concern, (err, memberInfo) => {
      if (err) {
        return next(err);
      }
      res.json(memberInfo);
      res.end();
    });
  } catch (err) {
    console.log("getMemberInfo failed");
  }
});

router.put('/updateMemberClubInfo', (req, res) => {
  //update one row of club ID according to email
  console.log("req param -> ", req.query.id);
  console.log("req body ->", req.body);
  try{
    MemberInfo.findByIdAndUpdate(req.query.id, { $set: req.body }, (err, user) => {
      if (err) {
        console.log("update memberinfo error");
        return next(err);
      }
      res.json(user);
      res.end();
    });
  } catch (err) {
    console.log("updateMemberClubInfo failed");
  }
});

// function censor(censor) {
//   var i = 0;

//   return function(key, value) {
//     if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
//       return '[Circular]'; 

//     if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
//       return '[Unknown]';

//     ++i; // so we know we aren't using the original object anymore

//     return value;  
//   }
// }

// Use localhost:9000/api followed by the required path.

module.exports = router;
