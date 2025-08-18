import  express from "express";
const apiRouter = express.Router()
import { upload } from '../utils/fileUploader.js';

apiRouter.post('/edit', upload.single("avatar"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
    }

    res.status(200).json({
        message: "success"
    })
})

export default apiRouter;