import express from "express";
const router = express.Router()
import catcher from '../middleware/catcher.middleware.js'
import { OK } from '../constants/status.constants.js'
import fileUpload, { fileValidation } from '../utils/multer.js'
const ADMIN = 'admin'


import * as controller from '../controllers/product.controller.js'
import { auth, hasRole } from "../middleware/auth.middleware.js";

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.route('/')
    .get(catcher(controller.getProducts))
    .post(auth, fileUpload(fileValidation.image).array('image', 3), catcher(controller.createProduct))

router.route('/:productId')
    .put(auth, hasRole(ADMIN), catcher(controller.updateProduct))
    .delete(auth, hasRole(ADMIN), catcher(controller.deleteProduct))

router.route('/:productId/reviews')
    .get(catcher(controller.getAllReviews))
    .post(auth, catcher(controller.createReview))

router.route('/:productId/reviews/:reviewId')
    .delete(auth, catcher(controller.deleteReview))

export default router