import express,{ Request,Response } from 'express';
const router = express.Router()
import createPost from "../controllers/postControllers/createPost";
import getPostByUser from "../controllers/postControllers/getPostsByUser";
import getAllPosts from "../controllers/postControllers/getAllPosts";
import deletePost from "../controllers/postControllers/deletePost";



router.post('/create', createPost)
router.delete('/delete/:postId', deletePost)
router.get('/all/:userId',getPostByUser)
router.get('/allPosts',getAllPosts)

export default router


