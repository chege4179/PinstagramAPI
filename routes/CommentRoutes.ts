import express from 'express';
import addComment from "../controllers/commentControllers/addComment";
import likeComment from "../controllers/commentControllers/likeComment";
import unlikeComment from "../controllers/commentControllers/unlikeComment";


const router = express.Router()


router.post('/add', addComment)
router.post('/like', likeComment)
router.post('/unlike', unlikeComment)


export default router
