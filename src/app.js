import express from 'express';
import cookieParser from'cookie-parser';
import cors from 'cors';
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { checkForAuthentication, isAuthentication } from './middlewares/ckeckAuth.middleware.js';

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine',"ejs")
app.set('views', join(__dirname, 'views'));

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static("public"))
app.use(cookieParser())
app.use(checkForAuthentication('authToken'))
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File size too large'
    });
  }

    // Error handling middleware
  if (err.message.includes('Invalid file type')) {
    return res.status(415).json({
      success: false,
      message: err.message
    });
  }
  
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Routes
import route from './routes/courses.route.js';
import userRoute from './routes/user.route.js';
import apiRouter from './routes/user-api.route.js';
import UploadRouter from './routes/uploader.route.js';
import sellRoute from './routes/sell.route.js'

app.use('/courses', route)
app.use('/user', isAuthentication, userRoute)
app.use('/sell', sellRoute)

app.use('/api/v1/user', apiRouter);
app.use('/api/v1/upload', UploadRouter);

export { app }