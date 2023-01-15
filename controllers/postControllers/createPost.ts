import express, {Response,Request} from "express";
import {uploadImage, uploadVideo} from "../../config/imageUploadUtil";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import { UploadedFile} from "express-fileupload";
import cloudinary from "cloudinary";
import {getFileExtension} from "../../config/util";



type CreatePostRequestBody =  {
     user:string

}

const createPost = async (req:TypedRequestBody<CreatePostRequestBody>,res:Response) => {
     let imageIds = []
     let imageURLs: { postMediaId: string | undefined; postMediaURL: string | undefined; postMediaType: string; }[] = []
     console.log("Body",JSON.parse(req.body.user))

     let mediaAssets  = [];
     try{
          for (const image in req.files) {
               mediaAssets.push(req.files[image])
          }
          const mediaAssetsInfo = mediaAssets.map(async (mediaAsset:UploadedFile | UploadedFile[]) => {

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
                              postMediaType: "video"
                         }
                    }
               }else {
                    return null
               }
          })
          const imageUrls = await Promise.all(mediaAssetsInfo)
          console.log("Image Urls",imageUrls)

          return res.json({
               msg:"Create Post received",
               success:true,
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
