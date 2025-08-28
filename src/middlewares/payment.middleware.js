import coursesArray from '../db/storage.js'
const checkYourCourse = (req, res, next) => {
    const course = coursesArray.find(c => c.id === req.params.id);
    if (course.price === 0) {
        next();
    } else {
        res.redirect(`/courses/checkout/${req.params.id}`);
    }
}

export { checkYourCourse };