import { app } from './app.js';
import { join } from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { registerUser, loginUser } from './controllers/user.controller.js';
// import { connectDB } from "./db/mysql_connect.js";
// onst { dotenv } = pkg

//  dotenv.config({
//    path: './env'

const port = 3000



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
  res.render('pages/index');
})

app.get('/register', (req, res) => {
    res.sendFile(join(__dirname, './views/pages/register.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(join(__dirname, './views/pages/login.html'))
})

app.post('/register', registerUser)
app.post('/login', loginUser)

app.get('/logout', (req, res) => {
  if (req.user) {
    res.clearCookie('authToken').redirect('/');
  }
  res.redirect('/login')
})


// connectDB()
// .then(()=>{
//     app.listen(port, () => {
//       console.log(`Example app listening on port ${port}`)
//     })
// })
// .catch((err)=>{
//     console.log("MONGO db failed: ", err);
// })
// connectDB()
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})