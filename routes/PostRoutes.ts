import express,{ Request,Response } from 'express';
const router = express.Router()
import createPost from "../controllers/postControllers/createPost";
import getPostByUser from "../controllers/postControllers/getPostsByUser";



router.post('/create', createPost)
router.get('/all',getPostByUser)

export default router


