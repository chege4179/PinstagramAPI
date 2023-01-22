import { Response ,Request } from "express";
import prisma from "../../config/db";
import {TypedRequestBody} from "../../types/TypedRequestBody";

type RequestBody = {
     followerId:string
     followedId:string

}
const unfollowUser = async (req:TypedRequestBody<RequestBody>,res:Response) => {
     try{
          const newFollower = await prisma.follower.deleteMany({
               where:{
                    followerUserId:req.body.followerId,
                    followedUserId:req.body.followedId,
               }
          })
          return res.json({
               msg:"Unfollow successful",
               success:true,
               newFollower:newFollower
          })



     }catch(err:any){
          console.log("An unexpected error occurred while adding follower",err)
          return res.json({
               msg:"An unexpected error occurred while adding follower",
               success:true,

          })


     }
}

export default unfollowUser

