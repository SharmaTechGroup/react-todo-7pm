import axios from "axios";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useCookies } from "react-cookie";
import { data, Link, useNavigate } from "react-router-dom";

export function ToDoDashboard(){
    const [cookies, setCookie, removeCookie] = useCookies(['userid', 'username']);
    const [appointments, setAppointments] = useState([{id:'', title:'', description:'', date:'', user_id:''}]);
    const [editAppointment, setEditAppointment] = useState({id:'', title:'', description:'', date:'', user_id:''});

    const [searchString, setSearchString] = useState('');

    let navigate = useNavigate();

    const formikAdd = useFormik({
        initialValues: {
            title: '',
            description:'',
            date:'',
            user_id: cookies['userid']
        },
        onSubmit:(appointment)=>{
            axios.post('http://localhost:3000/appointments', appointment)
            .then(()=>{
                LoadAppointments();
            })
        },
        enableReinitialize: true
    })

    const formikEdit = useFormik({
        initialValues : {
            id: editAppointment.id,
            title: editAppointment.title,
            description: editAppointment.description,
            date: editAppointment.date,
            user_id:editAppointment.user_id,
        },
        onSubmit : (appointment)=>{
            axios.put(`http://localhost:3000/appointments/${appointment.id}`, appointment)
            .then(()=>{
                LoadAppointments();
            })
        },
        enableReinitialize: true
    })

    /*
    function LoadAppointments(){
         axios.get('http://localhost:3000/appointments')
        .then(response=>{
             let userAppointments = response.data.filter(appointment=> appointment.user_id===cookies['userid']);
             setAppointments(userAppointments);
        })
    }*/


    const LoadAppointments = useCallback(()=>{

         axios.get('http://localhost:3000/appointments')
        .then(response=>{
             let userAppointments = response.data.filter(appointment=> appointment.user_id===cookies['userid']);
             setAppointments(userAppointments);
        })

    },[cookies, searchString])

    useEffect(()=>{

       LoadAppointments();

    },[])

    function handleSignout(){
        removeCookie('userid');
        removeCookie('username');
        navigate('/login');   
    }


    /*
    function handleEditClick(id){
       
        axios.get(`http://localhost:3000/appointments/${id}`)
        .then(response=>{
            setEditAppointment(response.data);
        })
    
    }
    */

    const handleEditClick = useCallback((id)=>{
        axios.get(`http://localhost:3000/appointments/${id}`)
        .then(response=>{
            setEditAppointment(response.data);
        })
    },[appointments, cookies])

    function handleDeleteClick(id){
        let choice = confirm('Are you sure?\nWant to Delete');
        if(choice===true){
            axios.delete(`http://localhost:3000/appointments/${id}`)
            .then(response=>{
                LoadAppointments();
            })
        }
    }

    function handleSearchChange(e){
        setSearchString(e.target.value);
        console.log(e.target.value);
    }

    const filteredAppointments = useMemo(()=>{

            if(searchString===''){
                return appointments;
            } else {
                return appointments.filter(appointment=> appointment.title.toLowerCase().includes(searchString.toLowerCase()));
            }  

    },[searchString])


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
                        <input type="text" onChange={handleSearchChange} placeholder="search appointments" className="form-control" />
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
                   <button data-bs-toggle="modal" data-bs-target="#newAppointment" className="btn btn-primary bi bi-plus-circle"> New Appointment</button>
                   <div className="modal fade" id="newAppointment">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <form onSubmit={formikAdd.handleSubmit}>
                                <div className="modal-header">
                                    <h3>New Appointment</h3>
                                </div>
                                <div className="modal-body">
                                        <input type="hidden" name="user_id" value={cookies['userid']} />
                                        <dl>
                                            <dt>Title</dt>
                                            <dd><input type="text" name="title" onChange={formikAdd.handleChange} className="form-control" /></dd>
                                            <dt>Description</dt>
                                            <dd>
                                                <textarea rows="4" name="description" onChange={formikAdd.handleChange} cols="40" className="form-control"></textarea>
                                            </dd>
                                            <dt>Date</dt>
                                            <dd>
                                                <input type="date" name="date" onChange={formikAdd.handleChange} className="form-control"/>
                                            </dd>
                                        </dl>
                                    
                                </div>
                                <div className="modal-footer">
                                    <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Add</button>
                                    <button data-bs-dismiss="modal" type="button" className="btn btn-danger mx-2">Cancel</button>
                                </div>
                                </form>
                            </div>
                        </div>
                   </div>
                </div>
                <div className="mt-4 d-flex flex-wrap">
                    {
                        (filteredAppointments.length===0)?<span>No Records Found</span>:
                        filteredAppointments.map(appointment=>
                            <div key={appointment.id} className="card w-25  p-2 m-2">
                                <div className="card-header fw-bold"> 
                                    {appointment.title.toUpperCase()}
                                </div>
                                <div className="card-body">
                                    <div>
                                        {appointment.description}
                                    </div>
                                    <div>
                                         {appointment.date}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button onClick={()=> {handleEditClick(appointment.id)} } data-bs-toggle="modal" data-bs-target="#editAppointment" className="btn btn-warning mx-2 bi bi-pen-fill"></button>
                                   
                                    <button onClick={()=>{ handleDeleteClick(appointment.id)}} className="btn btn-danger bi bi-trash-fill"></button>
                                </div>
                                 <div className="modal fade" id="editAppointment">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <form onSubmit={formikEdit.handleSubmit}>
                                                    <div className="modal-header">
                                                        <h3>Edit Appointment</h3>
                                                    </div>
                                                    <div className="modal-body">
                                                            <dl>
                                                                <dt>Title</dt>
                                                                <dd><input type="text" value={formikEdit.values.title} name="title" onChange={formikEdit.handleChange} className="form-control" /></dd>
                                                                <dt>Description</dt>
                                                                <dd>
                                                                    <textarea rows="4" value={formikEdit.values.description} name="description" onChange={formikEdit.handleChange} cols="40" className="form-control"></textarea>
                                                                </dd>
                                                                <dt>Date</dt>
                                                                <dd>
                                                                    <input type="date" value={formikEdit.values.date} name="date" onChange={formikEdit.handleChange} className="form-control"/>
                                                                </dd>
                                                            </dl>
                                                        
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button data-bs-dismiss="modal" type="submit" className="btn btn-success">Save</button>
                                                        <button data-bs-dismiss="modal" type="button" className="btn btn-danger mx-2">Cancel</button>
                                                    </div>
                                                    </form>
                                                </div>
                                            </div>
                                    </div>
                            </div>

                            

                        )
                    }
                </div>
            </div>
        </div>
    )
}