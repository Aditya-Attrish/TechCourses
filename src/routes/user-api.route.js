import  express from "express";
const apiRouter = express.Router()
import { upload } from '../utils/fileUploader.js';

apiRouter.post('/edit', upload.single("avatar"), (req, res) => {
    const formData = {...req.body}
    if (req.file) {

    }

    res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        avatar: formData.username,
        email: formData.email,
        Role: formData.role
    })
})

export default apiRouter;