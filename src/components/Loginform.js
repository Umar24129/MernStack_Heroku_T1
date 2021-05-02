import React,{useState} from 'react'


const Loginform = ({Login,error}) => {

    const [details,setDetails] =useState({name:"",email:"",password:""})
    const submitHandler= e =>{
        e.preventDefault()
        Login(details)
    }
    
    return (
        <>
        <form onSubmit={submitHandler}>
            <div className="add-form">
                <h2>Login</h2>
                
                <div className="form-control">
                    <label htmlFor="name"> Name:</label>
                    <input type="text" name="name" id="name" onChange={ e=>{
                        setDetails({...details, name: e.target.value})}} value={details.name} ></input>
                </div>
                
                <div className="form-control">
                    <label htmlFor="email"> Email:</label>
                    <input type="text" name="email" id="email" onChange={ e=>{
                        setDetails({...details, email: e.target.value})}} value={details.email} ></input>
                </div>
                <div className="form-control">
                    <label htmlFor="password"> Password:</label>
                    <input type="password" name="password" id="password" onChange={ e=>{
                        setDetails({...details, password: e.target.value})}} value={details.password} ></input>
                </div>
                
                <input type='submit' value='Login' className='btn btn-block'></input>
            </div>
        </form>
        {(error !== "" ? (<div className="error">{error}</div>):"")}
        </>
    )
}

export default Loginform
