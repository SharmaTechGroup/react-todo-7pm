import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ToDoHome } from "../components/todo-home";
import { ToDoLogin } from "../components/todo-login";
import { ToDoRegister } from "../components/todo-register";
import { ToDoDashboard } from "../components/todo-dashboard";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <ToDoHome />
            },
            {
                path: 'login',
                element: <ToDoLogin title='User Login' width='w-25' />
            },
            {
                path: 'register',
                element: <ToDoRegister  width='w-25' title='Register User'/>
            }
        ]
    },
    {
        path:'dashboard',
        element: <ToDoDashboard />
    }   
])
export default router;