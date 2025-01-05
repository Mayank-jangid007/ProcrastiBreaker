import React from 'react'
import './index.css'
import { Home } from './Components/'
import ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './App/store'
import { Pending } from './Components/'
import ErrorBoundary from "./Components/ErrorBoundary"
import {AddTodo} from './Components/'
import App from './App.jsx'
import { SubTask } from './Components/'
import { EditSubTodo } from "./Components/"
import { Tommorow } from "./Components/"
import { IndexCom } from "./Components/"
import { EditTodo } from "./Components/"
import { Timer } from "./Components/"
import { Profile } from "./Components/"
 
const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        path:"/",
        element:<Home/>,
        errorElement: <ErrorBoundary/>,     
        children:[
          {
            path:"tommorow",
            element:<Tommorow/>,
            errorElement: <ErrorBoundary/>,
          },
          {
            path:"index",
            element:<IndexCom/>,
            errorElement: <ErrorBoundary/>,
          },
          {
            path:"todoEdit",
            element:<EditTodo/>,
            errorElement: <ErrorBoundary/>,
          },
          {
            path:'profile',
            element:<Profile/>,
            errorElement: <ErrorBoundary/>,
          }
        ]  
      },
      {
        path: "subTask",
        element: <SubTask/>,
        errorElement: <ErrorBoundary/>,       
      },
      {
        path:"editSubTodo",
        element: <EditSubTodo/>,
        errorElement: <ErrorBoundary/>,
      },
      {
        path:"Pending",
        element:<Pending/>,
        errorElement: <ErrorBoundary/>,
      },
      {
        path: "timer",
        element: <Timer/>,
        errorElement: <ErrorBoundary/>,
      }
    ]
  }
],
{
  basename: "/ProcrastiBreaker", // Add this line
}
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
      {/* <Main/> */}
    </Provider> 
  </React.StrictMode>
)