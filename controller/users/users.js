'use strict'

import UsersModel from '../../models/users/getUsers'

class Users {
  constructor() {

  }
  async getUser(req, res, next) {
    const _page = req.query._page;
    const _limit = req.query._limit;
    const userData = await UsersModel.getDatas(_page, _limit)
    try {
      res.send(userData)
    } catch (err) {
      res.send({
        name: 'ERROR_DATA',
				message: '获取数据失败'
      })
    }
  }

  async removeUser(req, res, next) {
    const id = req.params.id;
    // 删除用户
    const dels = await UsersModel.delData(id)
    res.send({ msg: 'delete ok!', record: dels })
  }

  // 修改信息
  async patchUser(req, res, next) {
    const id = req.body.id
    const values = req.body.values
    try {
      const pat = await UsersModel.patchData(id, values)
      res.send({ msg: 'patch ok', record: pat })
    } catch(e) {
      //
    }
  }

  // 增加用户
  async addUser(req, res, next) {
     try {
        const user = req.body.values
        const redord = await UsersModel.addData(user)
        res.send( {msg: 'add ok!', record: redord})
     } catch(e) {
      //
     }
  }
}
export default new Users()