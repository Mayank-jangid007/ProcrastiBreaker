import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateTodo } from '../Features/TodoSlice';
import { motion } from 'framer-motion';
import { IoArrowBack } from "react-icons/io5";
import { NavLink } from 'react-router-dom';

function EditTodo() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todo = location.state?.data;
  const [day, setDay] = useState(todo?.day || '')

  const [formData, setFormData] = useState({
    TodoMsg: todo?.TodoMsg || '',
    Description: todo?.Description || '',
    img: todo?.img || '',
    day: todo?.day || ''
  });

  const handleDayToggle = (selectedDay) => {
    setDay(selectedDay);
    setFormData(prev => ({
      ...prev,
      day: selectedDay
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTodo({ ...todo, ...formData }));
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 overflow-y-auto ">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen p-4 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        {/* Back Button */}
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all duration-300"
        >
          <IoArrowBack size={24} />
        </motion.button>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-2xl mx-auto mt-16 bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-xl"
        >
          {/* Header */}
          <motion.h1 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold text-white mb-8 font-Barlow"
          >
            Edit Todo
          </motion.h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Preview Card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-48 rounded-2xl overflow-hidden group mb-8"
            >
              <img 
                src={formData.img || 'https://via.placeholder.com/400x200'} 
                alt="Preview"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                  {formData.TodoMsg || 'Todo Title'}
                </h3>
              </div>
            </motion.div>

            {/* Title Input */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label className="block text-white text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.TodoMsg}
                onChange={(e) => setFormData({...formData, TodoMsg: e.target.value})} 
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter todo title"
                required
              />
            </motion.div>

            {/* Description Input */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label className="block text-white text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.Description}
                onChange={(e) => setFormData({...formData, Description: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 h-32 resize-none"
                placeholder="Enter description"
              />
            </motion.div>

            {/* Image URL Input */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-white text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={formData.img}
                onChange={(e) => setFormData({...formData, img: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                placeholder="Enter image URL"
                required
              />
            </motion.div>

            {/* Date Input */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-white text-sm font-medium mb-2">Due Date</label>
              <input
                type="date"
                value={formData.day}
                onChange={(e) => setFormData({...formData, day: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            {/* Day Input */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
             <label className="block text-white text-sm font-medium mb-2">Day</label>
             <button type="button" onClick={() => handleDayToggle("Tomorrow")} className={`px-4 py-2 rounded-full transition-all duration-300 ${formData.day === "Tomorrow"? "bg-orange-500 text-white": "bg-white text-black hover:bg-slate-300"}`}>Tomorrow </button>
             <button type="button" onClick={() => handleDayToggle("Today")}  className={`px-4 py-2  ml-2 rounded-full transition-all duration-300 ${  formData.day === "Today"? "bg-orange-500 text-white" : "bg-white text-black hover:bg-slate-300"}`}
        >
          Today
        </button>
            </motion.div>

            {/* Buttons */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-4"
            >
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
              >
                Save Changes
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default EditTodo;