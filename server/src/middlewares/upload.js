const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'perfiles_usuarios', // Carpeta en Cloudinary donde se guardarán las imágenes
        allowed_formats: ['jpg', 'jpeg', 'png', 'WebP'], // Formatos permitidos
        transformation: [{ width: 500, height: 500, crop: 'limit' }] // transformar la imagen
    },
});


const storageProductos = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'productos', // Carpeta en Cloudinary donde se guardarán las imágenes de productos
        allowed_formats: ['jpg', 'jpeg', 'png', 'WebP'], // Formatos permitidos
        transformation: [{ width: 300, height: 300, crop: 'limit' }] // transformar la imagen
    },
});


const storageComplementos = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'complementos', // Carpeta en Cloudinary donde se guardarán las imágenes de productos
        allowed_formats: ['jpg', 'jpeg', 'png', 'WebP'], // Formatos permitidos
        transformation: [{ width: 300, height: 300, crop: 'limit' }] // transformar la imagen
    },
});


const uploadCloud = multer({ storage });
const uploadCloudProductos = multer({ storage: storageProductos });
const uploadCloudComplementos = multer({ storage: storageComplementos });


module.exports = {
    uploadCloud,
    uploadCloudProductos,
    uploadCloudComplementos
};