'use strict';

import express from "express";
import controller from '../controllers/user';
import authenticated from '../middlewares/authenticated';

const router = express.Router();

router.get('/', authenticated, controller.index);
router.post('/', controller.create);
router.get('/:id', authenticated, controller.read);
router.put('/:id', authenticated, controller.update);
router.delete('/:id', authenticated, controller.destroy);

export = router;