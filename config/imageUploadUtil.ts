import cloudinary from "cloudinary";

function uploadImage(ImagePath:string,ImageName:string,imageId:string){
     return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(ImagePath,
               {
                    resource_type: "image",
                    public_id: `pinstagram/${imageId}`,
                    chunk_size: 6000000,
                    eager_async: true,
               },
               (error, result) => {

                    if (error){
                         reject(error)
                         console.log("Error >>>",error)
                         return error
                    }else {
                         resolve(result)
                    }
               });
     })
}
function uploadVideo(ImagePath:string,ImageName:string,imageId:string){
     return new Promise((resolve, reject) => {
          cloudinary.v2.uploader.upload(ImagePath,
               {
                    resource_type: "video",
                    public_id: `pinstagram/${imageId}`,
                    chunk_size: 6000000,
                    eager_async: true,
               },
               (error, result) => {

                    if (error){
                         reject(error)
                         console.log("Error >>>",error)
                         return error
                    }else {
                         resolve(result)
                    }
               });
     })
}

export { uploadVideo,uploadImage }
