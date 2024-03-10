import express from "express";
import catcher from '../middleware/catcher.middleware.js';
const router = express.Router()

import * as controller from '../controllers/order.controller.js';
import { auth, hasRole } from "../middleware/auth.middleware.js";
import Roles from "../utils/AuthRoles.js";


router.get('/admin', auth, hasRole(Roles.ADMIN), controller.getAllOrders)

router.post('/', auth, catcher(controller.createOrder))

router.route('/my')
    .get(auth, catcher(controller.getMyOrders))

router.route('/:orderId')
    .get(auth, catcher(controller.getOrder))

router.route('/admin/:orderId')
    .put(auth, hasRole(Roles.ADMIN), catcher(controller.updateOrder))
    .delete(auth, hasRole(Roles.ADMIN), catcher(controller.deleteOrder))







export default router