import { FaTimes } from 'react-icons/fa'

const Task = ({ task, onDelete, onToggle }) => {
    const daterec = new Date(task.dayTime)
    const date = daterec.toLocaleString('default', { month: 'long' }) + " " + daterec.getDate() + ", " + daterec.getFullYear() + " --- "
        + daterec.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })



    return (
        <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onToggle(task._id)}>
            <h3>{task.text}
                <FaTimes style={{ cursor: 'pointer', color: 'red' }}
                    onClick={() => onDelete(task._id)} />  </h3>
            <p>{date}</p>
        </div>
    )
}  //key={task.id}> {task.text}

export default Task
