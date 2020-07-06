'use strict';

import { MemberInfo } from '../models/user_schema';

let createData = (req, res, next) => {
  MemberInfo.create(req.body).then(err => {
    if (err) {
      return next(err);
    }
    res.send('Entry created successfully!');
  });
};

let readData = (req, res, next) => {
  MemberInfo.find({}, '', (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

let updateData = (req, res, next) => {
  MemberInfo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.send(user);
  });
};

let deleteData = (req, res, next) => {
  MemberInfo.findByIdAndRemove(req.params.id, err => {
    if (err) {
      return next(err);
    }
    res.send('Entry deleted successfully!');
  });
};

module.exports = {
  createData,
  readData,
  updateData,
  deleteData,
};
