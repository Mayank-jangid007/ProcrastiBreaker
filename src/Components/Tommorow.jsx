import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";
import { BsThreeDotsVertical } from "react-icons/bs";

const Tommorow = () => {
    const todos = useSelector((state) => state.todo)
    const userTodo = useSelector((state) => state.user)
    const tommorow = todos.filter(todo => todo.day === "Tomorrow" && todo.userId === userTodo.email) 
    console.log("userTodo",userTodo);
    
    const navigate = useNavigate()
    const [height, setHeight] = useState({})
    const [completed2, setCompletedTasks] = useState({})
    const [showMenu, setShowMenu] = useState({})
    const [showLogOut, setShowLogOut] = useState(false)
    const GoEditPage = (data, id) => navigate('/subTask' , {state:{data: data, id: id}});
    const GoToSubPage = (data, id) => navigate('/subTask', { state: { data: data, id: id } });
    const [id, setId] = useState("")

    useEffect(() => {
        const calculateHeights = () => {
          const newHeights = {};
          const completed = {};
    
          todos.forEach((todoItem) => {
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
    
      }, [todos])
    
    return ( 
        <div className='absolute z-10 bg-black bg-opacity-0 from-black backdrop-blur-sm  bg-gradient-to-b top-[30vh] mt-4 w-full h-full'>
            <ul className="w-[95%] h-[72%] grid gap-3 mx-3 absolute pb-14 snap-y scroll-smooth overflow-y-auto no-scrollbar rounded-3xl" id="list">
                {tommorow ? tommorow.map((data) => {
                    const completedCount = data.SubTask?.filter(task => task.isEditable === true).length || 0;
                    const totalSubTasks = completed2[data.id] || 0;

                    return (
                        <motion.li
                        initial={{ opacity: 0, y: 2  }}
                        animate={{ opacity: 1, y: 0 }}
                        key={data.id}
                        onClick={() => { GoToSubPage(data, data.id), setId(data.id) }}
                        className="group h-48 relative bg-white/5 backdrop-blur-lg rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-200 w-full"
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
                }) : <p>No todos yet. Add your first todo!</p>}
            </ul>
        </div>
    )
}

export default Tommorow