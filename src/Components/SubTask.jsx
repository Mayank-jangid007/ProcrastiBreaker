import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";
import { CiMenuKebab } from "react-icons/ci";
import { UseApp } from "../App";
import { IoSend } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addSubTask } from "../Features/TodoSlice";
import { MdDone } from "react-icons/md";
import { clearSubTasks } from "../Features/TodoSlice";
import { toggleSubTaskStatus } from "../Features/TodoSlice";
//  CROSS PR CLICK KRNE PR EK PAGE PICHE JAE YE USE NAVIGATE SE HOGA CHAT GPT PR DEKHLE

function SubTask() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { show, setShow } = UseApp();

  const todos = useSelector((state) => state.todo || []);

  const { data, id } = location.state; // isme apni parent id arhi hai // agar location.state null ata hai to {} empty object chala jaega mtlb show hoga error ni aegi
  const parentTodo = todos.find(todo => todo.id === id)
  const subTodoArray = parentTodo?.SubTask || [];// apan ne bola ko parent todo ke andar jo subtask hai na wo apan ko do
  const [getValue, setValue] = useState("");



  const getTodoValue = (e) => {
    e.preventDefault();
    setShow(false);
    setValue("")

    if (getValue !== "") {
      dispatch(
        addSubTask({
          parentId: id,
          subTask: getValue,
        })
      );
    } else {
      console.log("nothing is set");
    }
  };

  const handleChecked = (subId) => {
    console.log("is work:", subId);
    dispatch(toggleSubTaskStatus({
      subId: subId,
      parentId: id,
    }))
  }


  return (
    <div className="relative w-full h-full bg-opacity-30 from-black bg-gradient-to-b">
      <div className="relative w-full h-[40%] rounded-3xl overflow-hidden shadow-b-">
        <img
          className="object-cover object-center w-full h-full"
          src={data.img}
        ></img>
        
        <div className="absolute bottom-3 left-5 right-5 z-10">
          <p className="text-gray-300/80 font-Barlow max-h-14 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent text-base leading-tight">
            {data.Description}
          </p>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-0 h-10 w-10 bg-white opacity-50 backdrop-blur-sm border border-3 border-black m-2 rounded-full text-black flex items-center justify-center text-lg"
        >
          <IoChevronBackOutline />
        </button>
        <button className="absolute top-0 right-0 h-10 w-10 bg-white opacity-50  border border-3 border-black m-2 rounded-full text-black font-bold flex items-center justify-center text-lg">
          <CiMenuKebab />
        </button>
        <div className="absolute top-10 p-3  text-4xl w-80  text-white font-bold">
          {data.TodoMsg}
        </div>
      </div>
      <ul className="relative w-full max-h-64  overflow-y-scroll rounded-2xl grid gap-1  mt-5">
        {subTodoArray.map((todo) => (
          <li key={todo.id} className="relative  flex text-white text-2xl font-bold font-Barlow rounded-2xl p-2 pb-4 h-15">
            <div className={`left-5 w-8  h-8 rounded-full border-[1px] flex justify-center items-center border-white text-black ${todo.isEditable ? "bg-white" : "" || false}`} onClick={() => handleChecked(todo.id)}>{todo.isEditable ? <MdDone /> : ""}</div>
            <p className={`bg-transparent ml-5 w-[90%] ${todo.isEditable ? "line-through text-gray-500" : "text-white" || false}`} onClick={() => navigate("/editSubTodo")}>{todo.TodoMsg}</p>
            <hr className="  w-[85%] absolute right-0 bottom-0" />
          </li>
        ))}
      </ul>
      {show ? (
        <form
          onSubmit={getTodoValue}
          className="absolute z-10 h-[99%] w-full top-0 backdrop-blur-lg rounded-3xl shadow-lg p-6"
        >
          <div className="absolute z-30 right-5 top-[30rem] w-20 h-20 rounded-full flex items-center justify-center bg-white animate-expandSub">
            <input
              type="text"
              onChange={(e) => setValue(e.target.value)}
              value={getValue}
              placeholder="Add Task"
              className="w-full h-full bg-white border-none outline-none text-center rounded-[40px] transition-all duration-500 ease-in-out focus:rounded-lg"
            ></input>
            <button
              type="submit"
              className="rounded-full pr-4 text-2xl h-full text-orange-500 ml-2"
            >
              <IoSend />
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
}

export default SubTask;

