import express from 'express'
import { checkYourCourse } from '../middlewares/payment.middleware.js'
import { isAuthentication } from '../middlewares/ckeckAuth.middleware.js';
import coursesArray from '../db/storage.js'

const route = express.Router();

route.get('/', (req, res) => {
    // categorize
    let courses1 = [];
    const currCat = req.query.cat || 'All'
    const uniqueCat = new Set(coursesArray.map(course => course.category));
    if(currCat === 'All')
        courses1 = coursesArray;
    else
        courses1 = coursesArray.find(course => course.category === currCat);


    // paginations
    const pageNum = parseInt(req.query.page) || 1;
    const per_page = 6;
    const start = (pageNum - 1) * per_page;
    const end = pageNum * per_page;
    const totalPage = Math.ceil(courses1.length/per_page);

    
    const courses = courses1.slice(start, end);
    res.render('pages/courses', {
        courses: courses,
        totalPage: totalPage,
        pageNum: pageNum,
        currCat: currCat,
        uniqueCat: uniqueCat
    });
});

route.get('/course/:id', (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render('pages/course-detail', {
        course: course
    });
});

route.get('/checkout/:id', isAuthentication, (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render('pages/checkout', {
        course: course
    })
})

route.get('/confimation/:id', (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render('pages/order_confime', {
        course: course
    });
});

route.get('/learn/:id', checkYourCourse, (req, res) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    res.render('pages/learning', {
        course: course
    });
});

export default route