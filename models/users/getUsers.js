'use strict';

import mongoose from 'mongoose';
import userData from '../../InitData/users'

const usersSchema = new mongoose.Schema({
    users: {}
})

usersSchema.statics.getDatas = function (page, limit) {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await this.findOne();
      // 分页
      const len = user.users.length
      const pages = Math.ceil(len / limit)
      if (page > pages) {
        resolve([])
        return
      }
      const arr = user.users.slice((page - 1) * limit, page * limit)
      resolve(arr)
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

usersSchema.statics.delData = function(id) {
  console.log(id)
  this.remove({ id: id })
}

const Users = mongoose.model('Users', usersSchema)

Users.findOne((err, data) => {
  if (!data) {
    Users.create({
      users: userData
    });
  }
});
export default Users
