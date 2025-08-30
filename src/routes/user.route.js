import express from 'express';
//import { registerUser } from "../controllers/user.controller.js";

const userRoute = express.Router()


userRoute.get('/', (req, res) => {
    res.render('pages/account');
});

userRoute.get('/edit', (req, res) => {
    res.render('pages/edit_profile');
});

userRoute.get('/purchase', (req, res) => {
    res.render('pages/purchase');
});

userRoute.get('/saved', (req, res) => {
    res.render('pages/savedCourses');
});


export default userRoute;