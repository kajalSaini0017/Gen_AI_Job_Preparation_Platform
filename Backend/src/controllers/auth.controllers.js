const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenBlackListModel = require('../models/tokenBlacklist.model')


/**
 * @name userRegisterController
 * @description Create new user
 * @access Public
 */
async function userRegisterController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Username, email or Password is required"
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Username and email is already exist"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });


    return res.status(201).json({
        message: "User successFully Created",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name userLoginController
 * @description user login existing account 
 */

async function userLoginController(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "email and  password is Require for login"
        })
    }

    const userExist = await userModel.findOne({ email: email });

    if (!userExist) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }

    const isPasswordMatch = await bcrypt.compare(password, userExist.password);

    if (!isPasswordMatch) {
        return res.status(400).json({
            message: "Invalid email and password"
        })
    }

    const token = jwt.sign({ id: userExist._id, email: userExist.email }, process.env.JWT_SECRET, { expiresIn: "3d" });

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });


    return res.status(200).json({
        message: "User Login successFul",
        user: {
            id: userExist._id,
            username: userExist.username,
            email: userExist.email
        }
    })
}

/**
 * @name userLogoutController
 * @description logout existing account
 */
async function userLogoutController(req, res) {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]

    if (!token) {
        return res.status(400).json({
            message: "user Already Logout"
        })
    }

    const tokenExist = await tokenBlackListModel.findOne({
        token
    })
    if (tokenExist) {
        return res.status(400).json({
            message: "Token already Blacklisted"
        })
    }

    await tokenBlackListModel.create({ token });

    res.clearCookie("token");

    return res.status(200).json({
        message: "user Logout successful"
    })
}

/**
 * @name getUserDetailes
 * @description get valide user detailes
 * @access private
 */
async function getUserDetailes(req, res) {
    const user = req.user.id;


    const isUserExist = await userModel.findOne({
        _id: user
    })
    if (!isUserExist) {
        return res.status(401).json({
            message: "user not found"
        })
    }

    return res.status(200).json({
        message: "get user detailes",
        user: {
            id: isUserExist._id,
            username: isUserExist.username,
            email: isUserExist.email,

        }
    })
}
module.exports = {
    userRegisterController,
    userLoginController,
    userLogoutController,
    getUserDetailes
}