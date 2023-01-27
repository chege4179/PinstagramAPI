import { Request,Response } from 'express';
import * as argon from "argon2";
import { v4 as uuidv4 } from 'uuid';
import generateAvatarURL from "../../config/util";
import {PrismaClientKnownRequestError} from "@prisma/client/runtime";
import prisma from "../../config/db";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import moment from "moment/moment";
import {validationResult} from "express-validator";




type SignUpRequestBody = {
     username:string,
     fullName:string,
     email:string
     password:string,

}
const signUpUser = async (req:TypedRequestBody<SignUpRequestBody>,res:Response) => {
     console.log(req.body)
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
          return res.status(400).json({
               msg:"Please input correct information",
               success:false
          });
     }
     try{
          const hash = await argon.hash(req.body.password);
          const user = await prisma.user.create({
               data:{

                    username:req.body.username,
                    fullName:req.body.fullName,
                    email:req.body.email,
                    password:hash,
                    createdAt:moment().format('LT'),
                    createdOn:moment().format('L'),
                    profileImageUrl:generateAvatarURL(req.body.fullName),

               }
          })
          return res.json({
               msg:"Sign Up successful",
               success:true,
               user
          })

     }catch(err:any){
          console.log("Error signing up user",err)
          if (err instanceof PrismaClientKnownRequestError){
               if (err.code === "P2002"){
                    return res.json({
                         msg:"A user with a similar email address already exist",
                         success:false,

                    })
               }else {
                    return res.json({
                         msg:"An unexpected error occurred",
                         success:false,

                    })
               }
          }else {
               return res.json({
                    msg:"An unexpected error occurred",
                    success:false,

               })
          }

     }

}

export default signUpUser
