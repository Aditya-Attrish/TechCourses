import { uploadMiddleware } from '../utils/fileUploader.js';
import path from 'path';

// Handle single image upload
export function uploadImage(req, res) {
  const upload = uploadMiddleware.singleImage('image');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'Image uploaded successfully',
      file: {
        path: req.file.path,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  });
}

// Handle multiple images upload
export function uploadMultipleImages(req, res) {
  const upload = uploadMiddleware.multipleImages('images', 5);
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }
    
    const uploadedFiles = req.files.map(file => ({
      path: file.path,
      filename: file.filename,
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size
    }));
    
    res.json({
      success: true,
      message: 'Images uploaded successfully',
      files: uploadedFiles
    });
  });
}

// Handle PDF upload
export function uploadPdf(req, res) {
  const upload = uploadMiddleware.pdf('document');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'PDF uploaded successfully',
      file: {
        path: req.file.path,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  });
}

// Handle video upload
export function uploadVideo(req, res) {
  const upload = uploadMiddleware.video('video');
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }
    
    res.json({
      success: true,
      message: 'Video uploaded successfully',
      file: {
        path: req.file.path,
        filename: req.file.filename,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size
      }
    });
  });
}

// Handle mixed file uploads (e.g., form with image and PDF)
export function uploadMixedFiles(req, res) {
  const upload = uploadMiddleware.mixedFiles([
    { name: 'image', maxCount: 1 },
    { name: 'document', maxCount: 1 }
  ]);
  
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message
      });
    }
    
    const response = {
      success: true,
      message: 'Files uploaded successfully'
    };
    
    if (req.files.image) {
      response.image = {
        path: req.files.image[0].path,
        filename: req.files.image[0].filename
      };
    }
    
    if (req.files.document) {
      response.document = {
        path: req.files.document[0].path,
        filename: req.files.document[0].filename
      };
    }
    
    res.json(response);
  });
}