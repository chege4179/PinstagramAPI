import express, {Response,Request} from "express";
import {uploadImage, uploadVideo} from "../../config/imageUploadUtil";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import { UploadedFile} from "express-fileupload";
import {getFileExtension} from "../../config/util";
import prisma from "../../config/db";
import {v4 as uuidv4} from "uuid";
import moment from "moment";
import { Prisma }from "@prisma/client"


type CreatePostRequestBody =  {
     user:string,
     caption:string

}

const createPost = async (req:TypedRequestBody<CreatePostRequestBody>,res:Response) => {


     const user = JSON.parse(req.body.user)
     console.log("User",user)
     const caption = req.body.caption

     let mediaAssets  = [];
     try{
          for (const image in req.files) {
               mediaAssets.push(req.files[image])
          }
          const mediaAssetsInfo:Promise<{ postMediaURL: any; postMediaId: any; postMediaType: string } | { postMediaURL: any; postMediaId: any; postMediaType: string } | null>[] = mediaAssets.map(async (mediaAsset:UploadedFile | UploadedFile[]) => {

               if ("tempFilePath" in mediaAsset) {
                    console.log("Here")
                    if (getFileExtension(mediaAsset.name) ==="mp4"){
                         const response = await uploadVideo(mediaAsset.tempFilePath, mediaAsset.name, mediaAsset.name)
                              .catch((err) => {
                                   console.log('Error  HERE', err)
                              })

                         return {
                              postMediaId:response?.public_id,
                              postMediaURL:response?.secure_url,
                              postMediaType: "video"
                         }
                    }else {
                         const response = await uploadImage(mediaAsset.tempFilePath, mediaAsset.name, mediaAsset.name)
                              .catch((err) => {
                                   console.log('Error  HERE', err)
                              })

                         return {
                              postMediaId:response?.public_id,
                              postMediaURL:response?.secure_url,
                              postMediaType: "image"
                         }
                    }
               }else {
                    return null
               }
          })
          const imageUrls = await Promise.all(mediaAssetsInfo)
          console.log("Image Urls",imageUrls )



          const postId = uuidv4()
          const newPost = await prisma.post.create({
               data:{
                    postId: postId,
                    postUserId:user.userId,
                    postCaption:caption,
                    createdAt:moment().format('LT'),
                    createdOn:moment().format('L'),
                    postLikes:[],
                    postViews:[],
               }
          })

          const newPostContent = await prisma.postMediaItem.createMany({
               // @ts-ignore
               data:
                    [...imageUrls.map((image) => {
                    return {
                         ...image,
                         postPostId:postId
                    }
               })],
               skipDuplicates:true,
          })

          return res.json({
               msg:"Post Created",
               success:true,
               newPost
          })
     }catch (e){
          console.log(e)
          return res.json({
               msg: "Message unexpected error occurred",
               success:true
          })
     }

}

export default createPost
