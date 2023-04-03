//import React from 'react'; //when you are using a class component
import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = ()  =>{
// Addtask form set to false per default
//my states
  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([ ])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])
  

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
    // Fetch Task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
  
      return data
    }
  

//Adding a task
const addTask = async (task) => {
  // const id = Math.floor(Math.random() * 1000) + 1
  // const newTask = {id, ...task}
  // // copy the old tasks and add the new tasks
  // setTasks([...tasks, newTask])


//Deleting a task
// const deleteTask = (id) => {
//  setTasks(tasks.filter((task) => task.id !==id))
// }

const res = await fetch('http://localhost:5000/tasks', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json',
  },
  body: JSON.stringify(task),
})

const data = await res.json()

setTasks([...tasks, data])
}

//Delete task from server
const deleteTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'DELETE',
  })
  setTasks(tasks.filter((task) => task.id !==id))
 }

//Toggle reminder

  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

  setTasks(
    tasks.map((task) =>
    task.id ===id? {...task, reminder: 
      !data.reminder } : task
      )
      )
      
}

  return (
    <div className="Container">
  <Header  
  onAdd={() => setShowAddTask(!showAddTask)}
 showAdd={showAddTask}/>
 { showAddTask && <AddTask onAdd={addTask}
  />}

  {tasks.length >0 ? (
  <Tasks tasks={tasks} 
  onDelete={deleteTask} 
  onToggle = {toggleReminder} />
  ) : (
'No tasks to show'
  )}  
  </div>
  )
}

export default App
