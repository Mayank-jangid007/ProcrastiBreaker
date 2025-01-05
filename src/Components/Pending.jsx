import React, { useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


function Pending() {
    const todos = useSelector((state) => state.todo || [])
    const assignedDay = todos.map((todo) => todo)
    const [days, setDays] = useState(0)
    const navigate = useNavigate()

    const GoToSubPage = (todo, id) =>{
        navigate('/subtask',{state: {data: todo, id: todo.id}})
    }
    const getDueDays = assignedDay.reduce((acc, todo) => {
        const dueDate = new Date(todo.day);
        const todayDate = new Date();

        dueDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);

        if (todo.day === "Tomorrow" || todo.day === "Today") {
            return acc;
        } else {
            if (todayDate > dueDate) {
                const diffTime = Math.abs(todayDate - dueDate);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                acc.push({
                    todo,
                    diffDays
                });
            }
            return acc;
        }
    }, []);
    console.log(getDueDays)
    return (

        <div className="h-full flex flex-col bg-transparent">
            {/* Header Section */}
            <div className="p-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500"
                >
                    Pending Tasks
                </motion.h1>
                <p className="text-white/60 mt-2">Tasks that need your attention</p>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 overflow-y-auto px-4 pb-6">
                <div className="grid gap-4">
                    {/* Task Card */}
                    {getDueDays ? getDueDays.map(({ todo, diffDays }) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="relative bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 h-[11rem] overflow-hidden"
                            key={todo.id}
                        >
                            <img src={todo.img} alt="todo" onClick={() => GoToSubPage(todo, todo.id)} className="absolute inset-0  object-cover w-full h-full object-center"/>
                            <div className=" flex items-start justify-between">
                                <div className="absolute bottom-3 ">
                                    <h2 className="text-white font-semibold">{todo.TodoMsg}</h2>
                                    <p className="text-white/60 text-sm mt-1">{todo.Description}</p>
                                </div>
                                <span className="absolute px-3 py-1 bg-red-500/20 text-red-500 text-xs rounded-full top-3 right-2">
                                    {diffDays} days overdue
                                </span>
                            </div>
                            <div className="absolute flex items-center gap-4 mt-4 top-0 left-2">
                                <div className="text-white text-sm"><span className="text-red-400">Due:</span> {todo.day}</div>
                            </div>
                        </motion.div>
                    )) : <div>No getDueDays</div>}
                </div>
            </div>

            {false && (
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-24 h-24 bg-white/5 rounded-full mx-auto mb-4 flex items-center justify-center"
                        >
                            <span className="text-4xl">🎉</span>
                        </motion.div>
                        <h3 className="text-white font-semibold">All Caught Up!</h3>
                        <p className="text-white/60 mt-2">No pending tasks at the moment</p>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Pending;