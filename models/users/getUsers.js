'use strict';

import mongoose from 'mongoose';
import userData from '../../InitData/users'

const usersSchema = new mongoose.Schema({
  data: {}
})

usersSchema.statics.getDatas = function () {
  return new Promise(async(resolve, reject) => {
    try {
      const user = await this.findOne();
      resolve(user.data.users)
    } catch (err) {
      reject({
        name: 'ERROR_DATA',
        message: '查找数据失败',
      });
      console.error(err);
    }
  })
}

const Users = mongoose.model('Users', usersSchema)
Users.findOne((err, data) => {
  if (!data) {
    Users.create({
      data: userData
    });
  }
});
export default Users