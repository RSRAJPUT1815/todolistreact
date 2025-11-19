import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task : {type : String , require :true},
    isDone : {type : Boolean , require : true}
},{timestamps:true})

const Task = mongoose.model("task",taskSchema);

export default Task;