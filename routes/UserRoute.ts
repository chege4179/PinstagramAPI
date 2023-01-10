import express,{ Request,Response } from 'express';
const router = express.Router()

const { body, validationResult } = require('express-validator')
const signUpUser = require("../controllers/UserControllers/SignUpUser");
const loginUser = require("../controllers/UserControllers/LoginUser");
const getAllUsers = require("../controllers/UserControllers/GetAllUsers")




router.post('/signup',
     body('email').isEmail(),
     body('password').isLength({ min: 5 }),
     body('username').isLength({ min: 5 }),
     body('fullname').isLength({ min: 5 }),
     signUpUser
)
router.post('/login',loginUser)
router.get('/all',getAllUsers)


export default router
