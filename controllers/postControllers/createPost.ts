import {Response,Request} from "express";
import {uploadImage} from "../../config/imageUploadUtil";


const createPost = async (req:Request,res:Response) => {
     let imageIds = []
     let imageURLs = []
     console.log("Body",req.body)
     console.log("Files",req.files)
     try{
          // for (const image in req.files) {
          //      const {
          //           secure_url,
          //           public_id
          //      } = await uploadImage(req.files[image].tempFilePath, req.files[image].name)
          //           .catch((err) => {
          //                console.log('Error  HERE', err)
          //           })
          //      imageURLs.push({ id:public_id,url:secure_url })
          //
          // }

          // await newProduct.save((err2,product) => {
          //      if (err2){
          //           console.log('Error while saving product')
          //           console.log(err2)
          //           return res.json({
          //                msg:'Product uploaded successfully',
          //                success:false
          //           })
          //      }else {
          //           console.log(product)
          //           return res.json({
          //                msg:'Product uploaded successfully',
          //                success:true,
          //                product
          //           })
          //      }
          // })

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
