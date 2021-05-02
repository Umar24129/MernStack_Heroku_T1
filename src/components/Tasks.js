
import Task from './Task'
//we can use Redux for better handling of tasks instead of doing it like rn
const Tasks = ({tasks,onDelete,onToggle}) => {

  return (
        <>
            {tasks.map((task,index) => (
                <Task key={index}  task={task} onDelete={onDelete} onToggle={onToggle}/>
            ))}

        </>
    )
}

export default Tasks
