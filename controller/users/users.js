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
}
export default new Users()