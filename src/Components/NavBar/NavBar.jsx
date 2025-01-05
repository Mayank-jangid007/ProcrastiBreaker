import React from "react";
import { RiTodoLine } from "react-icons/ri";
import { BiTaskX } from "react-icons/bi";
import { NavLink } from 'react-router-dom';
import { MdOutlineTimer } from "react-icons/md";

function NavBar() {
  return (
    <div className="flex justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-orange-400 p-2 rounded-xl w-fit flex bg-gradient-to-b from-orange-600">
        <NavLink to="/Home" className={({ isActive }) => `text-[20px] mr-2 ${isActive? "text-orange-400" : "text-white"}`}>
          <RiTodoLine />
        </NavLink>
        <NavLink to="/Pending" className={({ isActive }) => `text-[20px] mr-2 ${isActive? "text-orange-400" : "text-white"}`}>
          <BiTaskX />
        </NavLink>
        <NavLink to="/timer" className={({ isActive }) => `text-[20px] mr-2 ${isActive? "text-orange-400" : "text-white"}`}>
        <MdOutlineTimer />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;
