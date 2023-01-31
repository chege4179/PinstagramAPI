import {TypedRequestQuery} from "../../types/TypedRequestQuery";
import {Response} from "express";
import prisma from "../../config/db";

type SearchParams = {
     username:string
}
const searchUser = async (req:TypedRequestQuery<SearchParams>,res:Response) => {
     try {
          const username = req.query.username

          const searchResults = await prisma.user.findMany({
               where:{
                    username:{
                         // @ts-ignore
                         search:username
                    }
               }
          })
          return res.json({
               msg:"Search successful",
               success:true,
               users:searchResults
          })

     }catch (e){
          console.log("An unexpected error occurred searching user",e)
          return res.json({
               msg:"Search failed",
               success:false
          })
     }

}

export default searchUser
