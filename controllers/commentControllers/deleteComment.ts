import {Request,Response} from "express";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import prisma from "../../config/db";
import moment from "moment/moment";

type RequestBody = {
     commentId:string


}

const deleteComment = async (req:TypedRequestBody<RequestBody>,res:Response) => {
     try{
          const { commentId } = req.body
          const deleteComment = await prisma.comment.delete({
               where:{
                    commentId:commentId
               }
          })
          return res.json({
               msg:"Comment deleted successfully",
               success:true
          })

     }catch (err){
          console.log("An unexpected error occurred deleting a comment >>>> ",err)
          return res.json({
               msg:"An unexpected error deleting the comment",
               success:false
          })
     }
}



export default deleteComment
