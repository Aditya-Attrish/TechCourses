import { Router } from 'express';
const Uploadrouter = Router();
import { uploadImage, uploadMultipleImages, uploadPdf, uploadVideo, uploadMixedFiles } from '../controllers/uploadController.js';
// import { uploadMiddleware } from '../utils/fileUploader.js';

// Single image upload
Uploadrouter.post('/image', uploadImage);

// Multiple images upload
Uploadrouter.post('/images', uploadMultipleImages);

// PDF upload
Uploadrouter.post('/pdf', uploadPdf);

// Video upload
Uploadrouter.post('/video', uploadVideo);

// Mixed files upload
Uploadrouter.post('/mixed', uploadMixedFiles);

export default Uploadrouter;