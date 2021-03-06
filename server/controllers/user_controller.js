'use strict';

import { MemberInfo } from '../models/user_schema';

let addClubInfoForMember = (req, res, next) => {
  MemberInfo.create(req.body).then(err => {
    if (err) {
      return next(err);
    }
    res.send('Entry created successfully!');
  });
};

let getAllMemberInfo = (req, res, next) => {
  MemberInfo.find({}, '', (err, memberInfo) => {
    if (err) {
      return next(err);
    }
    res.send(memberInfo);
  });
};

let updateClubInfo = (req, res, next) => {
  MemberInfo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

let deleteClubInfo = (req, res, next) => {
  MemberInfo.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return next(err);
    }
    res.send('Entry deleted successfully!');
  });
};

module.exports = {
  addClubInfoForMember,
  getAllMemberInfo,
  updateClubInfo,
  deleteClubInfo
};
