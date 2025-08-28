import express from 'express'
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { checkYourCourse } from '../middlewares/payment.middleware.js'
import coursesArray from '../db/storage.js'

const route = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

route.get('/', (req, res) => {
    // paginations
    const pageNum = parseInt(req.query.page) || 1;
    const per_page = 6;
    const start = (pageNum - 1) * per_page;
    const end = pageNum * per_page;
    const totalPage = Math.ceil(coursesArray.length/per_page);

    const courses = coursesArray.slice(start, end);
    res.render(join(__dirname, '../../public','./views/pages/courses.ejs'), {
        courses: courses,
        totalPage: totalPage,
        pageNum: pageNum
    });
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

route.get('/learn/:id', checkYourCourse, (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render(join(__dirname, '../../public','./views/pages/learning.ejs'), {course: course});
});

export { route }