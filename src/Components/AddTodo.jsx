import React, { useState, useEffect} from "react";
import { useDispatch } from "react-redux";
import { createTodo } from "../Features/TodoSlice";
import { clearTodos } from "../Features/TodoSlice";
// import { UseApp } from "../../../Redux-Todo/src/App";
import { UseApp } from "../../src/App";
import { IoTimerOutline } from "react-icons/io5";
import { MdNotificationAdd } from "react-icons/md";
import { useForm } from "react-hook-form";

// to jab tu add kre na to wo input value dispatch kr or wo jani chahiye list me ot wo.list scroll honi vhahiye home page pr hi isse todo save hota rhega
// use useImperativeHandle for shareing values

function AddTodo() {
  const { setShow } = UseApp();
  const dispatch = useDispatch()
  const [getValue, setValue] = useState("")
  const [getDescription, setDescription] = useState("")
  
  const [selectedDate, setSelectedDate] = useState(false)
  const [today, setToday] = useState("")
  const [isActive, setIsActive] = useState(false);
  const handleDayToggle = (day) => {
    // e.stopPropagation();
    if(day == "Today" || day == "Tomorrow"){
      setToday(today === day ? "" : day); // dekh pehle manle day me today agya or campre kiya to today state me to kuch hai nhi to wo day ko return krdega fhir agli bar jab today pr click kiya fhir se aya is bar  today state me save hai ot wo "" hojaega
    }else{
      setToday(day)
      setSelectedDate(true) 
      console.log(day)
    }
  };
  
  const ImgArray = [
    "https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYiUyMHNpdGUlMjBiYWNrZ3JvdW5kJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHdlYiUyMHNpdGUlMjBiYWNrZ3JvdW5kJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1503410759647-41040b696833?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRhYmxldCUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1471107191679-f26174d2d41e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZHl8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1483058712412-4245e9b90334?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBvc3R8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWVkaXRhdGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2ViJTIwc2l0ZSUyMGJhY2tncm91bmQlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1505820013142-f86a3439c5b2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJpcHxlbnwwfHwwfHx8MA%3D%3D",
  ];
  
   
    useEffect(() => {
      const handleStorage = () => {
          if (!localStorage.getItem(STORAGE_KEY)) { 
              dispatch(clearTodos());
          }
      };

      window.addEventListener('storage', handleStorage); 
      return () => window.removeEventListener('storage', handleStorage); 
    }, [dispatch]);

  const getTodoValue = (e) => {
    // e.preventDefault();
    setShow(false);
    setValue("");
    setDescription("");
    let previousIndex = -1;
    const RandImg = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * ImgArray.length);
      } while (newIndex === previousIndex);
      previousIndex = newIndex; 
      return newIndex;
    };

    if (getValue !== "") {
      dispatch( 
        createTodo({
          TodoMsg: getValue,
          img: ImgArray[RandImg()],
          Description: getDescription,
          day: today
        })
      ); 
    }
  };
  
  return (
    <form
      onSubmit={(e)=> e.preventDefault()}
      className="absolute z-20 h-[100%] w-full top-0 bg-black bg-opacity-0 from-black backdrop-blur-sm  bg-gradient-to-b  rounded-3xl p-6 animate-expandBg" 
    >
      <h1 className="text-white text-4xl font-Barlow font-bold">New Task</h1>
      <div className="absolute w-fit top-28 ">
        <div className="flex items-center h-fit justify-center gap-2">
          <button className={`mr-1 w-fit left-2 p-2 rounded-full ${today === "Today" ? 'bg-gray-300 opacity-70 ' : 'bg-white text-black hover:bg-slate-300'} transition-all duration-500`}  onClick={() => (handleDayToggle("Today") ,setSelectedDate(false))}>Today</button>
          <button className={`mr-1 w-fit left-2 p-2 rounded-full ${today === "Tomorrow" ? 'bg-gray-300 opacity-70 ' : 'bg-white text-black hover:bg-slate-300'} transition-all duration-500`}  onClick={() => {handleDayToggle("Tomorrow") ,setSelectedDate(false)}}>Tomorrow</button>
          {
              today && selectedDate ? ( 
                <p className="text-black h-10 w-fit rounded-full  p-2 bg-gray-300 opacity-70 " onClick={() => handleDayToggle("")}>{today}</p>
              ) : (
                <input type="date" className="date-picker-custom w-10  h-10 pl-[5px] bg-white border-none outline-none cursor-pointer rounded-full hover:opacity-80 transition-all" value={today} onChange={(e) => handleDayToggle(e.target.value)}/>
              )
          }
        </div>
      </div>
      
      <div className="my-5 absolute  w-fit top-36 left-11 flex gap-2">
            <button className="mr-1 text-2xl w-fit bg-white left-2 p-2 rounded-full text-black hover:bg-slate-300 transition-all duration-500"><IoTimerOutline /></button>
            <button 
              className={`mr-1 text-2xl w-fit left-2 p-2 rounded-full bg-indigo-50 ${isActive?'bg-slate-400 ': ' hover:bg-slate-300'}transition-all duration-500`}onClick={() => setIsActive(!isActive)} aria-pressed={isActive} 
            >
              <MdNotificationAdd />
            </button>
        </div>
      
      <p className="absolute z-30 left-10 top-[15rem] text-white text-lg">Title</p>
      <div className="absolute z-30 right-5 top-[30rem] w-20 h-20 rounded-full flex items-center justify-center bg-white animate-expand">
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={getValue}
          placeholder="Add Task"
          className="w-full h-full bg-white border-none outline-none text-center rounded-[40px] transition-all duration-500 ease-in-out focus:rounded-lg"
        ></input>
      </div>
      <div className="absolute z-30 right-5 top-[30rem] w-20 h-20 rounded-full flex items-center justify-center bg-white animate-expandTwo">
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={getDescription}
          placeholder="Description"
          className="w-full h-full bg-white border-none outline-none text-center rounded-[40px] transition-all duration-500 ease-in-out focus:rounded-lg"
        ></input>
      </div>
      <button type="submit" onClick={getTodoValue} className="absolute z-30 text-white text-lg right-5 top-[30rem] w-20 h-20 rounded-full flex items-center justify-center from-orange-300 bg-gradient-to-t bg-orange-500 hover:bg-orange-800 transition duration-300  animate-expandBtn">
        Create
      </button>
    </form>
  )
   
}

export default AddTodo