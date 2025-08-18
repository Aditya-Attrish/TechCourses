import multer, { diskStorage } from 'multer';
import path from 'path';
import { existsSync, mkdirSync, unlink } from 'fs';


// Supported file types
const FILE_TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
  'video/mp4': 'mp4',
  'video/quicktime': 'mov',
  'video/x-msvideo': 'avi'
};

// File size limits (in bytes)
const FILE_SIZE_LIMITS = {
  image: 5 * 1024 * 1024, // 5MB
  pdf: 10 * 1024 * 1024, // 10MB
  video: 100 * 1024 * 1024 // 100MB
};

// Storage configuration
const storage = diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = '';
    console.log(file.mimetype);

    // Determine file type and set path
    if (file.mimetype.startsWith('image/')) {
      uploadPath = './public/uploads/images';
    } else if (file.mimetype === 'application/pdf') {
      uploadPath = './public/uploads/documents';
    } else if (file.mimetype.startsWith('video/')) {
      uploadPath = './public/uploads/videos';
    } else {
      return cb(new Error('Invalid file type'), false);
    }

    // Create directory if it doesn't exist
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = FILE_TYPES[file.mimetype];
    const uniqueSuffix = `${Math.floor(Math.random() * 1000000000)}-${Date.now()}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  if (FILE_TYPES[file.mimetype]) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only images, videos, and PDFs are allowed.'), false);
  }
};

// Configure multer with different file type handlers
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: Math.max(...Object.values(FILE_SIZE_LIMITS)) // Use the largest limit as default
  }
});

// Middleware for specific file types
const uploadMiddleware = {
  // Single image upload
  singleImage: (fieldName) => upload.single(fieldName),
  
  // Multiple images upload
  multipleImages: (fieldName, maxCount = 5) => upload.array(fieldName, maxCount),
  
  // PDF upload
  pdf: (fieldName) => upload.single(fieldName),
  
  // Video upload
  video: (fieldName) => upload.single(fieldName),
  
  // Mixed files (for forms with different file types)
  mixedFiles: (fields) => upload.fields(fields),
  
  // Custom file type with size limit
  custom: (options) => {
    return multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fileSize: options.sizeLimit || FILE_SIZE_LIMITS[options.fileType] }
    }).single(options.fieldName);
  }
};

// File deletion utility
const deleteFile = (filePath) => {
  unlink(filePath, (err) => {
    if (err) {
      console.error('Error deleting file:', err);
      return false;
    }
    return true;
  });
};

export {
  upload,
  uploadMiddleware,
  deleteFile,
  FILE_TYPES,
  FILE_SIZE_LIMITS
};