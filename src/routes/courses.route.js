import express from 'express'
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import coursesArray from '../db/storage.js'

const route = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

route.get('/', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/courses.ejs'), {courses: coursesArray});
});

route.get('/course/:id', (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render(join(__dirname, '../../public','./views/pages/course-detail.ejs'), {course: course});
})

route.get('/checkout/:id', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/checkout.ejs'))
})

route.get('/confimation/:id', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/order_confime.ejs'))
})

route.get('/learn/:id', (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render(join(__dirname, '../../public','./views/pages/learning.ejs'), {course: course});
});

export { route }