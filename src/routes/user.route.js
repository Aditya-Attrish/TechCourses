import express from 'express';
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
//import { registerUser } from "../controllers/user.controller.js";

const userRoute = express.Router()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

userRoute.get('/', (req, res) => {
    res.render(join(__dirname, "../../public","./views/pages/account.ejs"))
})

userRoute.get('/edit', (req, res) => {
    res.render(join(__dirname, "../../public","./views/pages/edit_profile.ejs"))
})

userRoute.get('/purchase', (req, res) => {
    res.render(join(__dirname, "../../public","./views/pages/purchase.ejs"))
})

userRoute.get('/saved', (req, res) => {
    res.render(join(__dirname, "../../public","./views/pages/savedCourses.ejs"))
})


export { userRoute }