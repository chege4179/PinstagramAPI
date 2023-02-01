import  {Response} from "express";
import {uploadImage, uploadVideo} from "../../config/imageUploadUtil";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import { UploadedFile} from "express-fileupload";
import {getFileExtension} from "../../config/util";
import prisma from "../../config/db";
import {v4 as uuidv4} from "uuid";
import moment from "moment";



type CreatePostRequestBody =  {

     userId:string,
     caption:string

}

const createPost = async (req:TypedRequestBody<CreatePostRequestBody>,res:Response) => {
     console.log("Request Body",req.body)
     const caption = req.body.caption

     let mediaAssets  = [];
     try{
          for (const image in req.files) {
               mediaAssets.push(req.files[image])
          }
          const mediaAssetsInfo:Promise<{ postMediaURL: any; postMediaType: string } | null>[] = mediaAssets.map(async (mediaAsset:UploadedFile | UploadedFile[]) => {

               if ("tempFilePath" in mediaAsset) {

                    if (getFileExtension(mediaAsset.name) ==="mp4"){
                         const response = await uploadVideo(mediaAsset.tempFilePath, mediaAsset.name, mediaAsset.name)
                              .catch((err) => {
                                   console.log('Error  HERE', err)
                              })

                         return {
                              postMediaURL:response?.secure_url,
                              postMediaType: "video"
                         }
                    }else {
                         const response = await uploadImage(mediaAsset.tempFilePath, mediaAsset.name, mediaAsset.name)
                              .catch((err) => {
                                   console.log('Error  HERE', err)
                              })

                         return {
                              postMediaURL:response?.secure_url,
                              postMediaType: "image"
                         }
                    }
               }else {
                    return null
               }
          })
          const imageUrls = await Promise.all(mediaAssetsInfo)
          const dummyMedia = [
               {
                    postMediaType:"Test 1",
                    postMediaURL:"Test 1"
               },
               {
                    postMediaType:"Test 2",
                    postMediaURL:"Test 2"
               },
               {
                    postMediaType:"Teseeeeeet 2",
                    postMediaURL:"Teeeeest 2"
               },

          ]



          const postId = uuidv4()
          const newPost = await prisma.post.create({
               data:{
                    postId: postId,
                    postCaption:caption,
                    createdAt:moment().format('LT'),
                    createdOn:moment().format('L'),
                    postAuthorId:req.body.userId.replace(/['"]/g, ''),


               }
          })

          const newPostContent = await prisma.postMedia.createMany({
               // @ts-ignore
               data:
                    [...imageUrls.reverse().map((image) => {
                    return {
                         ...image,
                         postMediaPostId:postId
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
