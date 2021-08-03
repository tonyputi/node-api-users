'use strict';

import express from "express";
import controller from '../../controllers/postgres/user';
// import authenticated from '../../middlewares/authenticated';

const router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.get('/:id', controller.read);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);

export = router;