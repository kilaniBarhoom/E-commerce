import express from "express";
const router = express.Router()
import catcher from '../middleware/catcher.middleware.js'
import { OK } from '../constants/status.constants.js'

import * as controller from '../controllers/order.controller.js'
import { auth, hasRole } from "../middleware/auth.middleware.js";


router.get('/admin', auth, hasRole('admin'), controller.getAllOrders)

router.post('/', auth, catcher(controller.createOrder))

router.route('/my')
    .get(auth, catcher(controller.getMyOrders))

router.route('/:orderId')
    .get(auth, catcher(controller.getOrder))

router.route('/admin/:orderId')
    .put(auth, hasRole('admin'), catcher(controller.updateOrder))
    .delete(auth, hasRole('admin'), catcher(controller.deleteOrder))







export default router