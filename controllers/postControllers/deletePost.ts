import {Response} from "express";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import prisma from "../../config/db";

type RequestBody = {
     postId:string
}

const deletePost = async (req:TypedRequestParams<RequestBody>,res:Response) => {
     try{
          const deletedPost = await prisma.post.delete({
               where:{
                    postId:req.params.postId
               },
               include:{
                    postContent:true,
               }
          })
          return res.json({
               msg:"Post deleted successfully",
               success:true
          })
     }catch (err){
          console.log("error deleting post",err)
          return res.json({
               msg:"An unexpected error occurred deleting a post",
               success:false
          })
     }
}

export default deletePost
