const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadImageCloud = async (req,res)=>{
  //take the path of the file
  const filePath = req.file.path;
  console.log(filePath)

  //send it to a temporary folder
  const pathFileDel=`tempUploads/${req.file.filename}`

  //upload the image to cloudinary and get the url
  const result = await cloudinary.uploader.upload(filePath);
  const imageUrl = result.secure_url;

  try {
    fs.unlink(pathFileDel, (error) => {
      if (error) {
        console.error('Error al borrar el archivo:', error);
      } else {
        console.log('Archivo borrado exitosamente.');
      }
    });

    //we respond to user with some message to give a 
    res.status(200).send({message:'Uploaded successfully!',imageUrl:imageUrl})
  } catch (error) {
    res.status(500).send({message:'Error uploading image'})
  }
}

module.exports = uploadImageCloud;

 

