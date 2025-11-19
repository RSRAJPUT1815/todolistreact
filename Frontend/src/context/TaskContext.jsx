import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const TaskContext = createContext()


export const TaskProvider = ({children}) => {

    const [Task, setTask] = useState([])

    const fetchTasks = async () => {
        try {
            const {data} = await axios.get('/api/task/all');            
            data.success ? setTask(data.tasks) : toast.error(data.message)

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
      fetchTasks()
    }, [])
     
    const value = {
        axios,
        setTask,
        Task,
        fetchTasks,
    }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

export const useTaskContext = ()=>{
    return useContext(TaskContext)
}

