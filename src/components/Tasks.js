
import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle}) => {
    //setTasks would be use to change any task at some point
 
  return (
    
<>
{/* looping through all the tasks and passing in task as a prop */}
{tasks.map((task, index) => (
< Task key={index} task={task} onDelete = {onDelete} onToggle = {onToggle}/>
  ))}
</>
  )
}
export default Tasks