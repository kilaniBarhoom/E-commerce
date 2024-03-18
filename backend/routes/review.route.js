import express from "express";
import { OK } from '../constants/status.constants.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from '../utils/AuthRoles.js';
const router = express.Router()

import * as controller from '../controllers/review.controller.js';
import { auth, hasRole } from "../middleware/auth.middleware.js";

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.route('/')
    .get(auth, hasRole(Roles.ADMIN), catcher(controller.getAllReviews))


router.route('/:productId')
    .get(catcher(controller.getReviewsOfAProduct))
    .post(auth, catcher(controller.createReview))

router.route('/:reviewId')
    .put(auth, catcher(controller.updateReview))
    .delete(auth, catcher(controller.deleteReview))

export default router