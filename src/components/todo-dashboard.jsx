import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoDashboard(){
    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [appointments, setAppointments] = useState([]);
    let navigate = useNavigate();

    useEffect(()=>{

        axios.get('http://localhost:3000/appointments')
        .then(response=>{
             let userAppointments = response.data.filter(appointment=> appointment.user_id===cookies['userid']);
             setAppointments(userAppointments);
        })

    },[])

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/login');   
    }
    return(
        <div className="row p-2">
            <div className="col-2 d-flex flex-column justify-content-between bg-light" style={{height:'600px'}}>
              <div>        
              <h3 className="mt-4">Task Manager</h3>
              <div className="fs-6 fw-bold mt-2">
                Hello ! {cookies['username']}
              </div>
              <div className="my-4">
                 <Link className="bi bi-pencil-square text-decoration-none"> Tasks</Link>
              </div>
               <div className="my-4">
                 <Link className="bi bi-calendar-date text-decoration-none"> Date</Link>
              </div>
               <div className="my-4">
                 <Link className="bi bi-gear-fill text-decoration-none"> Settings</Link>
              </div>
              </div>
              <div>
                <button onClick={handleSignout} className="btn btn-danger w-100">Signout</button>
              </div>
            </div>
            <div className="col-10">
                <div className="bg-light mt-1 p-3">
                    <div className="input-group">
                        <input type="text" placeholder="search appointments" className="form-control" />
                        <button className="bi bi-search btn btn-dark"></button>
                    </div>
                </div>
                 <div className="bg-light d-flex flex-row justify-content-between  flex-row mt-1 p-3">
                   <div className="d-flex flex-row">
                     <div>
                        <select className="form-select">
                            <option>Filter</option>
                        </select>
                    </div>
                    <div>
                        <select className="form-select mx-2">
                            <option>Sort</option>
                        </select>
                    </div>
                   </div>
                   <button className="btn btn-primary bi bi-plus-circle"> New Appointment</button>
                </div>
                <div className="mt-4 d-flex flex-wrap">
                    {
                        appointments.map(appointment=>
                            <div key={appointment.id} className="card w-25  p-2 m-2">
                                <div className="card-header fw-bold"> 
                                    {appointment.title}
                                </div>
                                <div className="card-body">
                                    <div>
                                        {appointment.description}
                                    </div>
                                    <div>
                                         {appointment.date}
                                    </div>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-info bi bi-eye"></button>
                                    <button className="btn btn-warning mx-2 bi bi-pen-fill"></button>
                                    <button className="btn btn-danger bi bi-trash-fill"></button>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}