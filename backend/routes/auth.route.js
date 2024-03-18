import express from "express";
import { OK } from '../constants/status.constants.js';
import * as controller from '../controllers/auth.controller.js';
import { auth, hasRole } from '../middleware/auth.middleware.js';
import catcher from '../middleware/catcher.middleware.js';
import Roles from '../utils/AuthRoles.js';
import fileUpload, { fileValidation } from '../utils/multer.js';

const router = express.Router()

router.use("/health", (req, res) => {
    return res.sendStatus(OK);
});

router.post('/signup', catcher(controller.signup))
router.post('/login', catcher(controller.login))
router.get('/logout', catcher(controller.logout))
router.put('/update-password', auth, catcher(controller.updatePassword))

router.route('/me')
    .get(auth, catcher(controller.getOwnProfile))
    .put(auth, fileUpload(fileValidation.image).single('avatar'), catcher(controller.updateOwnProfile))
    .delete(auth, catcher(controller.deleteOwnProfile))

//Route to get the role of the me (loged in user)
router.get('/me/role', auth, catcher(controller.getRole))

router.get('/admin/users', auth, hasRole(Roles.ADMIN), catcher(controller.getAll))
router.route('/admin/users/:userId', auth, hasRole(Roles.ADMIN))
    .get(catcher(controller.getOneUser))
    .put(catcher(controller.updateOneUser))
    .delete(catcher(controller.deleteOneUser))



export default router