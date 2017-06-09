'use strict'

import UsersModel from '../../models/users/getUsers'

class Users {
  constructor() {

  }
  async getUser(req, res, next) {
    const page = req.params.page;
    const userData = await UsersModel.getDatas()
    try {
      res.send(userData)
    } catch (err) {
      res.send({
        name: 'ERROR_DATA',
				message: '获取数据失败'
      })
    }
  }
}
export default new Users()