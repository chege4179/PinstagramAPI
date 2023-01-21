import {Response,Request} from "express";
import {TypedRequestParams} from "../../types/TypedRequestParams";
import prisma from "../../config/db";

type ParamsBody = {
     userId:string
}

const getPostsByUser = async (req:TypedRequestParams<ParamsBody>,res:Response) => {
     try{
          const { userId } = req.params
          const posts = await prisma.post.findMany({
               where:{
                    postAuthorId:userId
               },
               include:{
                    likes:true,
                    postContent:true,
                    views:true,
                    comments:true
               }
          })
          return res.json({
               msg:`Posts fetched successfully`,
               success:true,
               posts:posts
          })

     }catch (err){
          console.log("An unexpected error occurred fetching posts by a user >>>>>>>> ",err)
          return res.json({
               msg:`An unexpected error occurred`,
               success:false,
          })

     }

}

export default getPostsByUser
