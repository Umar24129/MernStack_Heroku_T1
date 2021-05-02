import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Loginform from "./components/Loginform"
//install react-icons so that we can use it instead of cdn
function App() {
  const [showAddTask, setShowAddtask] = useState(false)  //we want add button to toggle
  const [tasks, setTasks] = useState([

  ])//in settasks if we want to add data then we will not do .ppush like arrat
  // set tasks is  one way data so we would do like  settasks([...tasks,{}])   ...taks means 
  //what is already there and ,{} means here inside curly u gota add what u want to add as new


  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchtasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  const base_url= ''

  // fetch Data
  const fetchtasks = async () => {
    const res = await fetch(`${base_url}/getAllTasks`,{
      method: 'GET',
      // since are adding data we need to add header to specify our content type
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
      
    })
    const data = await res.json()
    console.log(data)
    return data
  }
  ///togglefetchtask
  const fetchtask = async (_id) => {
    const res = await fetch(`${base_url}/getTaskByID?_id=${_id}`,{
      method: 'GET',
      // since are adding data we need to add header to specify our content type
      headers: {
        'Accept': 'application/json',
      'Content-Type': 'application/json'
      }
      
    })
    
    const data = await res.json()
    // console.log(data[0].reminder)
    return data[0]
  }
  //Delete Task
  const deleteTask = async (_id) => {
    //console.log("Delete", id)

       console.log(JSON.stringify( _id))
     let  idtosend={
         _id: _id
       }
       console.log(idtosend)
   const res= await fetch(`${base_url}/delServiceByID`, {
      method: 'DELETE',
      // since are adding data we need to add header to specify our content type
     
     
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(idtosend)
    })
    const data = await res.json()
    console.log(data)


    //so now we are going to settask as remeber we have to do set methode for it
    setTasks(tasks.filter((task) => task._id !== _id))
  }

  // Toggle Reminder
  const toggleReminder = async (_id) => {
    console.log(_id + " : Toogle ID")
    const tasktoToggle = await fetchtask(_id)

    const updTask = { ...tasktoToggle, reminder: !tasktoToggle.reminder }
    console.log(updTask)
    const res = await fetch(`${base_url}/updateReminder`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()
    console.log(data)
    //console.log('Toogled', id)
    //  console.log(tasks)
    setTasks(tasks.map((task) => task._id === _id ? { ...task, reminder: updTask.reminder } : task))
    // console.log(tasks)
  }

  //AddTask
  const addTask = async (task) => {
    // console.log("A new task came in" , task)
    // const id= Math.floor(Math.random()*10000)+1  // this will give us a random id , we need for new task
    // console.log(id) 

    // const newTask={id,...task}
    // setTasks([...tasks,newTask])



    ///Adding below
    //To enable shairing between react and node , have to enable cross origin shairing
    //Have to enable it for a particular domain server
    //npm install --save cors
    // and import into node server
    const res = await fetch(`${base_url}/addITasks`,
      {
        method: 'POST',
        // since are adding data we need to add header to specify our content type
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
    const data = await res.json()

    console.log(JSON.stringify(data)+" : InsterID,Object ID")
    task._id= data
    console.log(task)

     setTasks([...tasks, task])
    
     
  }
  ////////////////Below are files for Login data//////////
  // const adminuser = {
  //   email: "admin@admin.com",
  //   password: "admin123"
  // }

  const [user, setUser] = useState({ email: "" })
  const [error, setError] = useState("")



  const Login = async (details) => {
    console.log(details)
    const res = await fetch(`${base_url}/authentication?email=${details.email}&password=${details.password}`,
      {
        method: 'GET',
        // since are adding data we need to add header to specify our content type
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }

      })
    const data = await res.json()

    console.log(data)


    if (!data.message && details.email === data[0].emailmon && details.password === data[0].passwordmon) {
      console.log("loged in")
      setUser({
        email: details.email,
      })
    } else {
      console.log("details dont match" + data.message)
      setError("Wrong Email or Password")

    }
  }

  const Logout = () => {
    console.log("Logout")
    window.localStorage.clear()
    setUser({ email: "" })
    setError("")
  }

  ////////////////Aboveare files for Login data//////////

  return (
    <div className="container">

      {(user.email !== "") ? (
        <div className="welcome">

          <h2>Welcome, <span>{user.name}</span></h2>
          {/* <Header title="Header of task tracker"/> 
                 passing in props directly, it has priority over default props */}
          <Header onAdd={() => { setShowAddtask(!showAddTask) }} showAdd={showAddTask} Logout={Logout} />
          {showAddTask && <AddTask onAdd={addTask} />}
          {/* && is short version of turnary operator like if showaddTask true then shoe Add task */}
          { tasks.length > 0 ? <Tasks tasks={tasks}
            onDelete={deleteTask} onToggle={toggleReminder} /> : 'No Tasks to Show'}

          {/* <button onClick={Logout}>Logout</button> */}
        </div>
      ) : <Loginform Login={Login} error={error}></Loginform>}


    </div>
  );
}
// there are different ways to do CSS
// 1. use style sheet 2.Style component (external packages) 3. direct css
// in direct styling have to add style in component tag like in html but a lil different
export default App;
