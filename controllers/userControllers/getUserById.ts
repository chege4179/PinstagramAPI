import {Response,Request} from "express";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import prisma from "../../config/db";



type RequestParams = {
     userId:string
}
const getUserById = async (req:TypedRequestParams<RequestParams>,res:Response) => {
     const userId = req.params.userId
     if (!userId){
          return res.json({
               msg:"Please pass a userId",
               success:false
          })
     }
     try{
          const user = await prisma.user.findUnique({
               where:{
                    userId:userId
               }
          })
          if (user === null){
               return res.json({
                    msg:"No user was found",
                    success:false,

               })
          }else {
               const posts = await prisma.post.findMany({
                    where:{
                         postUserId: userId
                    }
               })
               const newPosts = await Promise.all(posts.map(async (post) => {
                    return {
                         ...post,
                         postsContent:await prisma.postMediaItem.findMany({
                              where:{
                                   postPostId: post.postId
                              }
                         })

                    }
               }))
               return res.json({
                    msg:"User fetched successfully",
                    success:true,
                    user,
                    posts:newPosts
               })
          }
     }catch (err:any){
          console.log(err)
          return res.json({
               msg:"An unexpected error occurred fetching user info",
               success:false,
               user:null,
               posts:null

          })
     }
}

export default getUserById


