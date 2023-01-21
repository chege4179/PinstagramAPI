import {Request, Response} from "express";
import prisma from "../../config/db";


const getAllPosts = async (req:Request,res:Response) => {
     try{
          const posts = await prisma.post.findMany({
               include:{
                    postContent:true,
                    likes:true,
                    views:true,
                    comments:true

               }
          })

          return res.json({
               msg:"Post fetched successfully",
               success:true,
               posts:posts
          })

     }catch (err){
          console.log(err)
          return res.json({
               msg:"An error occurred fetching posts",
               success:false,
               posts:null
          })

     }

}

export default getAllPosts
