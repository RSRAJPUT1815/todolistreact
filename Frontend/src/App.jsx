import { useState, useEffect, useContext, useRef } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Toaster } from 'react-hot-toast';
import { useTaskContext } from './context/TaskContext';
import toast from 'react-hot-toast';


function App() {

  const { Task, axios, fetchTasks } = useTaskContext()


  const [todo, setTodo] = useState("")
  const [isDone, setIsDone] = useState(false)
  const [showIsDone, setShowIsDone] = useState(false)
  const inputRef = useRef()

  const saveTask = async () => {
    try {
      const task = { task: todo, isDone }

      const { data } = await axios.post('/api/task/add', task);

      if (data.success) {
        toast.success(data.message)
        setTodo("");
        fetchTasks()
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const handelDelete = async (e, id) => {
    try {
      const { data } = await axios.post('/api/task/delete',{_id : id});
      if (data.success) {
        toast.success(data.message);
        fetchTasks()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  let togglefinish =async (id , isDone) => {
    try {
      const Update = {isDone : !isDone}
      const { data } = await axios.post('/api/task/update',{_id : id, Update});
      if (data.success) {
        toast.success(data.message);
        fetchTasks()
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handelEdit = async(e,id) => {
    try {
      setTodo(e)
      const { data } = await axios.post('/api/task/delete',{_id : id});
      if (data.success) {
        fetchTasks()
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handelChange = (e) => {
    setTodo(e.target.value)
  }




  return (
    <>
      <Toaster />
      <Navbar />
      <div className=" w-[50%] max-md:w-[80%]  mx-auto my-5 rounded-xl p-5 bg-gray-600 min-h-[80vh] ">
        <h1 className='font-bold text-center md:text-xl'>Task Manager For You </h1>
        <div className="addtodo flex flex-col gap-3 my-5">
          <div className="text-lg font-bold">Add a Task</div>
          <input type="text" ref={inputRef} onChange={handelChange} value={todo} className='w-full rounded-lg py-1 px-3 font-bold' />
          <button onClick={saveTask}  className='bg-slate-800 hover:bg-slate-900 text-sm font-bold py-1 text-white rounded-md my-5  w-full cursor-pointer'>Save</button>
        </div>
        <input className='my-4' onClick={()=>setShowIsDone(!showIsDone)} type="checkbox" checked={()=>showIsDone} /> Show finished Tasks
        <h1 className='text-lg font-bold'>Your Tasklist</h1>
        <div className="todos">
          {Task.length === 0 && <div className='m-5' >No Tasks Now</div>}

          {Task.map(item => {
            return (showIsDone === item.isDone) && <div key={item._id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-4'>
                <input onClick={()=>togglefinish(item._id , item.isDone)} type="checkbox" checked={item.isDone} name={item._id} />
                <div className={item.isDone ? "line-through" : ""}>{item.task}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handelEdit(item.task, item._id)} className='bg-slate-800 hover:bg-slate-900 p-3 text-sm font-bold py-1 text-white rounded-md mx-1 '><FaRegEdit /></button>
                <button onClick={(e) => { handelDelete(e, item._id) }} className='bg-slate-800 hover:bg-slate-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 '><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
