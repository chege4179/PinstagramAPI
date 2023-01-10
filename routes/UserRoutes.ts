import express,{ Request,Response } from 'express';
const router = express.Router()
import { body, validationResult } from 'express-validator'
import signUpUser from "../controllers/userControllers/signUpUser";
import loginUser from "../controllers/userControllers/loginUser";
import getAllUsers from "../controllers/userControllers/getAllUsers";



router.post('/signup', signUpUser)
router.post('/login',loginUser)
router.get('/all',getAllUsers)


export default router
