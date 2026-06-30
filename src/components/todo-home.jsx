import { ToDoLogin } from "./todo-login";
import { ToDoRegister } from "./todo-register";

export function ToDoHome(){
    return(
        <div className="d-flex justify-content-center align-items-baseline mt-4" style={{height:'500px'}}>
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item"> <a data-bs-toggle="tab" href="#login" className="nav-link active"> User Login </a> </li>
                    <li className="nav-item"> <a data-bs-toggle="tab" href="#register" className="nav-link"> Register User </a> </li>
                </ul>
                <div className="mt-2 p-3">
                    <div className="tab-content">
                        <div className="tab-pane active" id="login">
                            <ToDoLogin title='' />
                        </div>
                        <div className="tab-pane" id="register">
                            <ToDoRegister />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}