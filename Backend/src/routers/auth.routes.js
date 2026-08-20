const {Router} = require('express');
const authController = require('../controllers/auth.controllers');
const authmiddleware = require('../middleware/auth.middleware')

const authRoutes = Router();

/**
 * @routes POST/api/auth/register
 * @description Create new user
 * @access Public
 */
authRoutes.post('/register',authController.userRegisterController);

/**
 * @routes POST/api/auth/login
 * @description Login existing account
 */
authRoutes.post("/login",authController.userLoginController);

/**
 * @routes GET/api/auth/logout
 * @description Logout existing account
 */
authRoutes.get("/logout",authController.userLogoutController)

/**
 * @routes GET/api/auth/get-me
 * @description get valide logedin user details 
 * @access Private
 */
authRoutes.get("/get-me",authmiddleware.authmiddleware,authController.getUserDetailes)
module.exports = authRoutes;