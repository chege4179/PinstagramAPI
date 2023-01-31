import express,{ Request,Response } from 'express';
import signUpUser from "../controllers/userControllers/signUpUser";
import loginUser from "../controllers/userControllers/loginUser";
import getAllUsers from "../controllers/userControllers/getAllUsers";
import getUserById from "../controllers/userControllers/getUserById";
import followUser from "../controllers/userControllers/followUser";
import unfollowUser from "../controllers/userControllers/unfollowUser";
import {body} from "express-validator";
import searchUser from "../controllers/userControllers/searchUser";

const router = express.Router()

router.post('/signup',
     body("email").isEmail().isLength({ min:5 }),
     body("password").isLength({ min: 5 }),
     body("fullName").isLength({ min: 5 }),
     body("username").isLength({ min: 5 }),
     signUpUser)

router.post('/login',
     body("email").isEmail().isLength({ min:5 }),
     body("password").isLength({ min: 5 }),
     loginUser)


router.get('/all',getAllUsers)
router.get("/single/:userId",getUserById)
router.get("/search",searchUser)

router.post('/follow',followUser)
router.post('/unfollow',unfollowUser)


export default router
