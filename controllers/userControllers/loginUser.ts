import { Request,Response } from 'express';
import prisma from "../../config/db";
import * as argon from "argon2";
import jwt from "jsonwebtoken";

const loginUser = async (req:Request,res:Response) => {
     try{
          const user = await prisma.user.findUnique({
               where:{
                    email:req.body.email,
               }
          })
          if (!user) {
               return res.json({
                    msg:"No such user exists",
                    success:false,
               })
          }else {
               const pwMatches = await argon.verify(user.password,req.body.password)
               if (pwMatches){
                    const token = jwt.sign(user, 'shhhhh')
                    return res.json({
                         msg:"Login Successful",
                         success:true,
                         user,
                         jwtToken:token
                    })
               }else {
                    return res.json({
                         msg:"Wrong Password...Please try again",
                         success:false,
                         user:null,
                         jwtToken:null
                    })
               }
          }
     }catch (err) {
          console.log(err)
          return res.json({
               msg:"An unexpected error occurred...Please try again",
               success:false,
          })
     }
}
export default loginUser
