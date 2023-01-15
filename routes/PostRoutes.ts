import express,{ Request,Response } from 'express';
const router = express.Router()
import createPost from "../controllers/postControllers/createPost";
import getPostByUser from "../controllers/postControllers/getPostsByUser";
import getAllPosts from "../controllers/postControllers/getAllPosts";



router.post('/create', createPost)
router.get('/all',getPostByUser)
router.get('/allPosts',getAllPosts)

export default router


