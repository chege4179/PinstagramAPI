import { Response ,Request } from "express";
import prisma from "../../config/db";
import {TypedRequestBody} from "../../types/TypedRequestBody";

type RequestBody = {
     followerId:string
     followedId:string

}
const followUser = async (req:TypedRequestBody<RequestBody>,res:Response) => {
     try{
          const existingFollow = await prisma.follower.findFirst({
               where:{
                    followerUserId:req.body.followerId,
                    followedUserId:req.body.followedId,
               }
          })
          if (existingFollow !== null){
               return res.json({
                    msg:"Existing follow exists",
                    success:false,

               })
          }else {
               const newFollower = await prisma.follower.create({
                    data:{
                         followerUserId:req.body.followerId,
                         followedUserId:req.body.followedId,
                    }
               })
               return res.json({
                    msg:"New follower added",
                    success:true,
                    newFollower:newFollower
               })
          }



     }catch(err:any){
          console.log("An unexpected error occurred while adding follower",err)
          return res.json({
               msg:"An unexpected error occurred while adding follower",
               success:true,

          })


     }
}

export default followUser

