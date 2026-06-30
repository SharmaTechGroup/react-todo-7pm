import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export function ToDoRegister(props){

    const [msg, setMsg] = useState('');
    const [errorClass, setErrorClass] = useState('');

    let navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            user_id:'',
            user_name:'',
            password:'',
            email:''
        },
        onSubmit: (user)=> {
            axios.post('http://localhost:3000/users', user)
            .then(()=>{
                alert('Registered Successfully..');
                navigate("/login");
            })
        }
    })

    function VerifyUserId(e){
        axios.get(`http://localhost:3000/users`)
        .then(response=>{
             let existingUser = response.data.find(user=> user.user_id===e.target.value);
             if(existingUser){
                setMsg('User Id Taken - Try Another');
                setErrorClass('text-danger');
             } else {
                setMsg('User Id Available');
                setErrorClass('text-success');
             }
        })
    }

    return(
        <div className={props.width}>
             <form onSubmit={formik.handleSubmit}>
                {
                    (props.title==='')?<span></span>:<h3>{props.title}</h3>
                }
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onKeyUp={VerifyUserId} name="user_id" onChange={formik.handleChange} className="form-control" /></dd>
                    <dd className={errorClass}>{msg}</dd>
                    <dt>User Name</dt>
                    <dd><input type="text" name="user_name" onChange={formik.handleChange} className="form-control" /></dd>
                    <dt>Password</dt>
                    <dd><input type="password" name="password" onChange={formik.handleChange} className="form-control" /></dd>
                     <dt>Email</dt>
                    <dd><input type="email" name="email" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
            <div className="mt-2">
                <Link to="/login">Existing User Login</Link>
            </div>
        </div>
    )
}