import express,{ Request,Response } from 'express';
import signUpUser from "../controllers/userControllers/signUpUser";
import loginUser from "../controllers/userControllers/loginUser";
import getAllUsers from "../controllers/userControllers/getAllUsers";
import getUserById from "../controllers/userControllers/getUserById";
import followUser from "../controllers/userControllers/followUser";
import unfollowUser from "../controllers/userControllers/unfollowUser";

const router = express.Router()

router.post('/signup', signUpUser)
router.post('/login',loginUser)
router.get('/all',getAllUsers)
router.get("/single/:userId",getUserById)

router.post('/follow',followUser)
router.post('/unfollow',unfollowUser)


export default router
