import expess from "express";
import { addTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const taskRouter = expess.Router();

taskRouter.post("/add" , addTask);
taskRouter.get('/all', getTasks );
taskRouter.post('/delete',deleteTask);
taskRouter.post('/update',updateTask);

export default taskRouter;


