const express = require('express');

const authController = require('../controllers/user-sm');

const router = express.Router();

router.post('/signup', authController.createNewUser);
router.post('/signin', authController.postSignin);

module.exports = router;