import { createConnection } from 'mysql';

export function connectDB(){
    let con = createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "techcourses"
    });
    
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    return con
}