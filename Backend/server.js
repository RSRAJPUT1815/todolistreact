import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import taskRouter from "./routes/taskRoutes.js";


const app = express();

await connectDB()

//middleware 

app.use(cors())
app.use(express.json())

//Routes

app.get('/',(req,res)=>{res.send("api is on")});
app.use("/api/task" , taskRouter)

const port = process.env.PORT || 3000;

app.listen(port , ()=>{
    console.log("Server is ON at "+ port)
})

export default app;