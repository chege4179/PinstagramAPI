import {Request, Response} from "express";
import prisma from "../../config/db";


const getAllPosts = async (req:Request,res:Response) => {
     try{
          const posts = await prisma.post.findMany()
          const postsWithImages = await Promise.all(posts.map(async (post) => {
               return{
                    ...post,
                    postUser: await prisma.user.findUnique({
                         where:{
                              userId: post.postUserId
                         }
                    }),
                    postsContent:await prisma.postMediaItem.findMany({
                         where:{
                              postPostId:post.postId
                         }
                    })
               }
          }))
          return res.json({
               msg:"Post fetched successfully",
               success:true,
               posts:postsWithImages
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
