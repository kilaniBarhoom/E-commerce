import express from "express";
import { OK } from '../constants/status.constants.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from '../utils/AuthRoles.js';
import fileUpload, { fileValidation } from '../utils/multer.js';
const router = express.Router()

import * as controller from '../controllers/product.controller.js';
import { auth, hasRole } from "../middleware/auth.middleware.js";

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.route('/')
    .get(catcher(controller.getProducts))
    .post(auth, fileUpload(fileValidation.image).array('images', 5), catcher(controller.createProduct))

router.route('/:productId')
    .get(catcher(controller.getProduct))
    .put(auth, hasRole(Roles.ADMIN), catcher(controller.updateProduct))
    .delete(auth, hasRole(Roles.ADMIN), catcher(controller.deleteProduct))

router.route('/:productId/reviews')
    .get(catcher(controller.getAllReviews))
    .post(auth, catcher(controller.createReview))

router.route('/:productId/reviews/:reviewId')
    .delete(auth, catcher(controller.deleteReview))



// /api/products/:productId/resolve
router.route('/:productId/resolve')
    .post(auth, hasRole(Roles.ADMIN), catcher(controller.resolveProduct))

export default router