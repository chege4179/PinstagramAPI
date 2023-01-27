import express,{ Request,Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import cloudinary from "cloudinary";
import FileUpload from "express-fileupload"
import PostRoutes from "./routes/PostRoutes";
import UserRoutes from "./routes/UserRoutes";
import CommentRoutes from "./routes/CommentRoutes";


const app: express.Application = express();



dotenv.config()

cloudinary.v2.config({
     cloud_name: process.env.CLOUD_NAME,
     api_key: process.env.CLOUDINARY_API_KEY,
     api_secret: process.env.CLOUDINARY_API_SECRET,
     secure: true
})
app.use(FileUpload({ useTempFiles:true }))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))


app.get('/', (req:Request, res:Response) => {
     return res.send("Pinstagram App Server");
});
app.use('/user',UserRoutes)
app.use('/post',PostRoutes)
app.use('/comment',CommentRoutes)
// Server setup




export default app

