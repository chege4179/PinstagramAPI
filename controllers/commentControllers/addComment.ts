import {Request,Response} from "express";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import prisma from "../../config/db";
import moment from "moment/moment";

type RequestBody = {
     postId:string
     commentContent:string

     userId:string

}

const addComment = async (req:TypedRequestBody<RequestBody>,res:Response) => {
     try{
          const { postId,userId,commentContent } = req.body
          const newComment = await prisma.comment.create({
               data:{
                    commentContent:commentContent,
                    commentAuthorId:userId,
                    commentPostId:postId,
                    commentCreatedAt:moment().format('LT'),
                    commentCreatedOn:moment().format('L'),
               }
          })
          return res.json({
               msg:"Comment posted created successfully",
               success:true
          })

     }catch (err){
          console.log("An unexpected error occurred creating a comment >>>> ",err)
          return res.json({
               msg:"An unexpected error creating the comment",
               success:false
          })
     }
}



export default addComment
