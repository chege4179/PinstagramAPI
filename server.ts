import express,{ Request,Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import UserRoutes from "./routes/UserRoutes";
import {PrismaClient} from "@prisma/client";

const app: express.Application = express();
const prisma = new PrismaClient()
dotenv.config()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))


app.get('/', (req:Request, res:Response) => {
     return res.send("Pinstagram App Server");
});
app.use('/user',UserRoutes)
// Server setup





const port: number = 9000;
app.listen(port, () => {
     console.log(`PInstagram API running http://localhost:${port}/`);
});
