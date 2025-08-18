import express from 'express'
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const sellRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

sellRoute.get('/', (req, res) => {
    res.render(join(__dirname, '../../public','./views/pages/sell-courses.ejs'))
})

export default sellRoute