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
               },
               include:{
                    followers:true,
                    following:true
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
                         postAuthorId:req.params.userId
                    },
                    include:{
                         postContent:true,
                         likes:true,
                         comments:true,
                         views:true,
                         postCreator:true,


                    }
               })
          
               return res.json({
                    msg:"User fetched successfully",
                    success:true,
                    user,
                    posts:posts
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


