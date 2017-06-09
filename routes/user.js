'use strict';

import express from 'express'
import Users from '../controller/users/users'
const router = express.Router();

router.get('/', Users.getUser);

export default router