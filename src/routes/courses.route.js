import express from 'express'
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const route = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

route.get('/', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/courses.ejs'))
})

route.get('/:id', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/course-detail.ejs'))
})

route.get('/checkout', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/checkout.ejs'))
})

route.get('/confimation', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/order_confime.ejs'))
})

route.get('/learn', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/learning.ejs'))
})

export { route }