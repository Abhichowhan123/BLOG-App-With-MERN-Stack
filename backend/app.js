import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import router from "./scr/routes/user_routes.js";
import connectDB  from '../backend/scr/Database/db.js';
import blogRouter from "./scr/routes/blog_routes.js"
dotenv.config({path:'../backend/scr/Database/.env'})
import cors from 'cors';


const app = express();
app.use(cors())
app.use(express.json());
app.use('/',router)
app.use('/blog',blogRouter)


const port = 5000
connectDB()
// mongoose.connect("mongodb+srv://admin:admin@cluster0.n9w10yb.mongodb.net/?retryWrites=true&w=majority")
// .then(()=>console.log("connected to database "))
// .catch((error)=>console.log(error));


app.use("/",(rea,res,next)=>{
    res.send("hello")
})

app.listen(port,()=>console.log('app is runing '))