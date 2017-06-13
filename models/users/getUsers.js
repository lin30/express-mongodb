'use strict';

import mongoose from 'mongoose';
import userData from '../../InitData/users'

const usersSchema = new mongoose.Schema({
  "id": Number,
  "name": String,
  "username": String,
  "email": String,
  "address": {
    "street": String,
    "suite": String,
    "city": String,
    "zipcode": String,
    "geo": {
      "lat": String,
      "lng": String
    }
  },
  "website": String
})
usersSchema.index({ id: 1 });

usersSchema.statics.getDatas = function (page, limit) {
  return new Promise(async(resolve, reject) => {
    try {
      if (page < 1) {
        resolve([])
      }
      // 分页
      const user = await this.find()
          .sort({'id': 1})
          .skip(limit * (page - 1))
          .limit(3);
      resolve(user)
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

usersSchema.statics.delData = function (id) {
  return new Promise(async(resolve, reject) => {
    try {
      await this.findOneAndRemove({
        id: id
      }, (err, data) => {
        if (!err) {
          resolve(data)
        }
      })
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '删除数据失败',
      });
      console.error(err);
    }
  })
}

usersSchema.statics.patchData = function (id, values) {
  return new Promise(async(resolve, reject) => {
    try {
      await this.findOneAndUpdate({
        id: id
      }, values, (err, data) => {
        if (!err) {
          resolve(data)
        }
      })
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '修改数据失败',
      });
      console.error(err);
    }
  })
}
const Users = mongoose.model('Users', usersSchema)

Users.findOne((err, data) => {
  if (!data) {
    Users.create(userData);
  }
});
export default Users