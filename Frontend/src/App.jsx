import { useState , useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
const [showfinish, setShowfinish] = useState(true)

  const savetolocal = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  useEffect(() => {
    let todosstring = localStorage.getItem("todos");
    if (todosstring) {
      
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
    }
  },[] )
  let togglefinish =(e) => {
    setShowfinish(!showfinish)
  }
  
  


  const handelEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos)
    savetolocal()

  }
  const handelDelete = (e, id) => {
    
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });

    setTodos(newTodos);
    savetolocal()

  }
  const handelAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }])
    setTodo("")
    savetolocal()
  }
  const handelChange = (e) => {
    setTodo(e.target.value)
  }
  const handelcheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    savetolocal()
  }

  return (
    <>
      <Navbar />
      <div className=" w-[50%] max-md:w-[80%]  mx-auto my-5 rounded-xl p-5 bg-gray-600 min-h-[80vh] ">
      <h1 className='font-bold text-center md:text-xl'>Task Manager For You </h1>
        <div className="addtodo flex flex-col gap-3 my-5">
          <div className="text-lg font-bold">Add a Task</div>
          <input type="text" onChange={handelChange} value={todo} className='w-full rounded-lg py-1 px-3 font-bold' />
          <button onClick={handelAdd} disabled={todo.length<3} className='bg-slate-800 hover:bg-slate-900 text-sm font-bold py-1 text-white rounded-md my-5  w-full cursor-pointer'>Save</button>
        </div>
        <input className='my-4' onClick={togglefinish} type="checkbox" checked={showfinish} /> Show finished Tasks
        <h1 className='text-lg font-bold'>Your Tasklist</h1>
        <div className="todos">
          {todos.length === 0 && <div className='m-5' >No Tasks Now</div>}
          {todos.map(item => {

            return (showfinish || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
              <div className='flex gap-4'>
                <input onClick={handelcheckbox} type="checkbox" checked={item.isCompleted} name={item.id} />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handelEdit(e, item.id)} className='bg-slate-800 hover:bg-slate-900 p-3 text-sm font-bold py-1 text-white rounded-md mx-1 '><FaRegEdit /></button>
                <button onClick={(e) => { handelDelete(e, item.id) }} className='bg-slate-800 hover:bg-slate-900 p-2 text-sm font-bold py-1 text-white rounded-md mx-1 '><MdDelete /></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
