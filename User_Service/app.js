import express from "express";
import userRoute from "./routes/userRoute.js";
import {connectDb} from "./database/db.js"
import errorHandler from "./error/errorHandler.js"
import session from "express-session";
const app = express();
const port = 3001;

app.use(session({
    secret: 'mycsession',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 180 * 60 * 1000 } // 3 hours
  }));




app.use(express.json({extended: true}));
app.use('/api/users', userRoute)



//connnect the database 
connectDb();    
app.use(errorHandler);

app.listen(port,() => console.log(`listening on port http://localhost:${port}`));
