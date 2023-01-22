import express from 'express';
import addComment from "../controllers/commentControllers/addComment";
import likeComment from "../controllers/commentControllers/likeComment";
import unlikeComment from "../controllers/commentControllers/unlikeComment";
import deleteComment from "../controllers/commentControllers/deleteComment";


const router = express.Router()


router.post('/add', addComment)
router.post('/delete', deleteComment)
router.post('/like', likeComment)
router.post('/unlike', unlikeComment)


export default router
