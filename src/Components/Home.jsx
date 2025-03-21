import React, { useEffect, useState } from "react";
import { AddTodo } from './index'
import { UseApp } from "../../src/App"
// import { UseApp } from '../../../Redux-Todo/src/App'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteTodo } from "../Features/TodoSlice";
import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import { BsThreeDotsVertical } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../Features/TodoSlice";

function Home() {
  const { show } = UseApp();
  const dispatch = useDispatch()
  const [style, setStyle] = useState("absolute left-0 right-0 bottom-0 h-1 w-0 bg-orange-500 rounded-full mx-auto transition-all duration-400 bg-gradient-to-r from-orange-400 to-black")
  const todo = useSelector((state) => state.todo) || [];
  const userData = useSelector((state) => state.user)
  const [showMenu, setShowMenu] = useState({})
  const [showLogOut, setShowLogOut] = useState(false)


  const userTodo = todo.filter((item) => item.userId === userData.email) 

  const navigate = useNavigate()
  const GoToSubPage = (data, id) => navigate('/subTask', { state: { data: data, id: id} }); 
  const GoEditPage = (data, id) => navigate('todoEdit', { state: { data: data, id: id } });

  // Delete-Todo-Section
  const handleDelete = (TodoId) => {
    dispatch(deleteTodo(TodoId))
  }

  const toggleMenu = (e, todoId) => {
    e.stopPropagation()
    setShowMenu(prev => ({ ...prev, [todoId]: !prev[todoId] }))
  }

  useEffect(() => {
    setTimeout(() => {
      setStyle((prev) => prev.replace("w-0", "w-full")) 
    }, 1000)
  }, [todo])

  const [id, setId] = useState("")
  const [height, setHeight] = useState({})
  const [completed2, setCompletedTasks] = useState({})


  useEffect(() => {
    const calculateHeights = () => {
      const newHeights = {};
      const completed = {};
     

      todo.forEach((todoItem) => {
        if (todoItem.SubTask && todoItem.SubTask.length > 0) {
          const completedTasks = todoItem.SubTask.filter(task => task.isEditable === true);
          const percentage = Math.round((completedTasks.length / todoItem.SubTask.length) * 100);

          newHeights[todoItem.id] = percentage;
         
          completed[todoItem.id] = todoItem.SubTask.length
        } else {
          newHeights[todoItem.id] = 0;
        }
      });

      return { newHeights, completed };
    };


    const { newHeights, completed } = calculateHeights();
    setHeight(newHeights);
    setCompletedTasks(completed)

  }, [todo])


  return (
    <div className="relative  h-full">
      {/* header section */}
      <h5 className="text-red-50 font-Poppins relative w-fit pb-1 group mx-3">
        <span className="text-red-50 font-Poppins relative">{userData.name ? `Hello${userData.name} ` : "Hello there"}</span>
        <span className={`${style}`}></span>
      </h5>
      <h1 className="text-white text-5xl font-Barlow font-bold mx-3 mt-4">
        Your <br /><span className="text-orange-500 bg-gradient-to-r from-orange-400 to-black text-transparent bg-clip-text">Projects</span>

      </h1>

      {/* Profile section */}
      <div className="absolute top-6 right-6 z-20" onClick={() => userData.isAuthenticated ? navigate('/') : navigate('profile')}>
        <div onClick={() => userData.isAuthenticated ? setShowLogOut(!showLogOut) : navigate('profile')} className="h-14 w-14 ring-4 ring-orange-400/30 rounded-full overflow-hidden hover:scale-105 transition-transform duration-300">
          <img
            src="https://gratisography.com/wp-content/uploads/2024/03/gratisography-vr-glasses-800x525.jpg"
            className="w-full h-full object-cover"
            alt="profile"
          />
        </div>
        {showLogOut  && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-16 top-0 mt-2 w-32 py-2 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-50"
        >
          <button
            onClick={() => {
              dispatch(logoutUser())
              setShowLogOut(false)
            }}
            className="w-full px-4 py-2 text-white hover:bg-white/10 text-left"
          >
              Logout
            </button>
          </motion.div>
        )}
      </div>


      {show && <AddTodo />}

      {/* Navigation */}
      <div className="flex gap-3 px-6 mt-5 pb-4">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-4 py-2 rounded-full transition-all duration-300 ${isActive
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`
          }
        >
          Today
        </NavLink>
        <NavLink
          to="tommorow"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full transition-all duration-300 ${isActive
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`
          }
        >
          Tomorrow
        </NavLink>
        <NavLink
          to="index"
          className={({ isActive }) =>
            `px-4 py-2 rounded-full transition-all duration-300 ${isActive
              ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
              : "bg-white/10 text-gray-300 hover:bg-white/20"
            }`
          }
        >
          Inbox
        </NavLink>
      </div>

      <div className="mt-[30vh]">
        <Outlet />  
      </div>
      <ul className="grid gap-4  absolute top-56 w-[90%] mx-auto left-0 right-0 pb-32 overflow-y-auto no-scrollbar max-h-[calc(100vh-14rem)]">
        {Array.isArray(todo) && todo.length > 0 ? (
          userTodo.map((data) => {
            const completedCount = data.SubTask?.filter(task => task.isEditable === true).length || 0;
            const totalSubTasks = completed2[data.id] || 0;

            return (
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={data.id}
                
                className="group relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-200 w-full"
              >
                {/* Todo Card Content */}
                <div className="relative h-48" onClick={() => { GoToSubPage(data, data.id), setId(data.id) }}>
                  <img
                    src={data.img}
                    alt={data.TodoMsg}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white text-2xl font-bold mb-2 line-clamp-1">
                        {data.TodoMsg}
                      </h3>
                      <p className="text-gray-300 text-sm line-clamp-2">
                        {data.Description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <div className="relative h-16 w-1.5 bg-white/20 rounded-full overflow-hidden  ">
                    <div
                      style={{
                        height: `${height[data.id] || 0}%`,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        transformOrigin: 'bottom'
                      }}
                      className="bg-gradient-to-t from-orange-400 to-orange-600 rounded-full transition-all duration-500"
                    />
                  </div>
                  <div className="text-white text-xs font-medium">
                    {completedCount}/{totalSubTasks}
                  </div>
                </div>

                {/* Menu Button */}
                <div className="absolute top-4 left-4">
                  <button
                    onClick={(e) => toggleMenu(e, data.id)}
                    className="p-2 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all duration-300"
                  >
                    <BsThreeDotsVertical className="text-white" />
                  </button>

                  {showMenu[data.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-0 mt-2 w-32 py-2 bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-50"
                    >
                      <button
                        onClick={() => handleDelete(data.id)}
                        className="w-full px-4 py-2 text-white hover:bg-white/10 text-left"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => GoEditPage(data, data.id)}
                        className="w-full px-4 py-2 text-white hover:bg-white/10 text-left"
                      >
                        Edit
                      </button>
                    </motion.div>
                  )}
                </div>

                <div className="absolute top-4 right-16 px-3 py-1 rounded-full bg-white/10 backdrop-blur-lg">
                  <span className="text-white text-xs font-medium">{data.day}</span>
                </div>
              </motion.li>
            );
          })
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8">
              <p className="text-gray-400 text-lg">No todos yet. Add your first todo!</p>
            </div>
          </motion.div>
        )}
      </ul>
    </div>
  );
}

export default Home;
