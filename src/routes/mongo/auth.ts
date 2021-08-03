'use strict';

import express from 'express';
import controller from '../../controllers/mongo/auth';

const router = express.Router();

router.post('/login', controller.login);

export = router;