import express from 'express';
import cookieParser from'cookie-parser';
import { route } from './routes/courses.route.js';
import { userRoute } from './routes/user.route.js';
import apiRouter from './routes/user-api.route.js';
import UploadRouter from './routes/uploader.route.js';
import sellRoute from './routes/sell.route.js'

const app = express()

app.set('view engine',"ejs")

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static("public"))

// Routes
app.use('/courses', route)
app.use('/user', userRoute)
app.use('/sell', sellRoute)

app.use('/api/v1/user', apiRouter);
app.use('/api/v1/upload', UploadRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      success: false,
      message: 'File size too large'
    });
  }

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


export { app }