import { Request,Response } from 'express';
import prisma from "../../config/db";

const getAllUsers = async (req:Request,res:Response) => {
     try{
          const users = await prisma.user.findMany({
               include:{
                    posts:true,
                    likes:true,
                    followers:true,
                    following:true,
               }

          })
          return res.json({
               msg:"All Users fetched successfully",
               success:true,
               users
          })

     }catch (err){
          console.log("Error getting users",err)
          return res.json({
               msg:"An unexpected error occurred fetching all users",
               success:false,
          })
     }

}

export default getAllUsers
