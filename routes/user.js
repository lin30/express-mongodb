'use strict';

import express from 'express'
import Users from '../controller/users/users'
const router = express.Router();

router.get('/', Users.getUser);
router.delete('/remove/:id', Users.removeUser);
router.post('/patch', Users.patchUser);
router.post('/addUser', Users.addUser);

export default router