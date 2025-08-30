import express from 'express'

const sellRoute = express.Router();

sellRoute.get('/', (req, res) => {
    res.render('pages/teaching')
});

sellRoute.get('/get-started', (req, res) => {
    res.render('pages/sell-courses')
});

export default sellRoute