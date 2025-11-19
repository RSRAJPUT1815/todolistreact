import { json } from "express";
import Task from "../models/task.js";

export const addTask = async (req,res) => {
    try {
        const {task , isDone} = req.body;
        
        //check all fields 
        if (!task ) {
            return res.json({success:false , message : "missing fields"})
        }
        await Task.create({task , isDone});
        res.json({success:true , message:"task added successfully"})

    } catch (error) {
        res.json({success:false , message: error.message})
    }
}

export const getTasks = async (req,res) => {
    try {
        const tasks = await Task.find();
        res.json({success:true , tasks})
    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const deleteTask = async (req,res) => {
    try {
        const {_id} = req.body;
        
        await Task.findByIdAndDelete(_id);

        res.json({success:true,message:"Task deleted"})

    } catch (error) {
         res.json({success:false , message:error.message});
    }
}

export const updateTask = async (req,res) => {
    try {
        const { _id, Update} = req.body;


        await Task.findByIdAndUpdate(_id, Update);
        res.json({success:true , message:"Task Updated"});
    } catch (error) {
         res.json({success:false , message:error.message});
    }
}