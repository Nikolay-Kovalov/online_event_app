const {Router} = require('express');
const auth = require('../middlewares/auth');
const getCurrentUser = require('../controllers/usersControllers/getCurrentUser');
const ctrlWrapper = require('../helpers/ctrlWrapper');
const verifyEmail = require('../controllers/usersControllers/verifyEmail');
const updateAvatar = require('../controllers/usersControllers/updateAvatar');
const upload = require('../middlewares/upload');

const usersRouter = Router();

usersRouter.get('/current', auth, getCurrentUser);
usersRouter.get('/verify/:verificationToken', ctrlWrapper(verifyEmail));
usersRouter.patch('/avatar', auth, upload.single('avatar'), ctrlWrapper(updateAvatar))

module.exports = usersRouter;