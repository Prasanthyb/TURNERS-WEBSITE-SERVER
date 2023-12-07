const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.route('/')
    .post(userController.Login)

router.route('/signup')
    .post(userController.Signup)

module.exports = router;