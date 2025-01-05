import React from 'react'
import { GoPlus } from "react-icons/go";

function AddBtn({Click}) {

  return (
    <button onClick={Click} className='z-20 h-16 w-16 flex items-center justify-center from-orange-300 bg-gradient-to-t bg-orange-500 hover:bg-orange-800 transition duration-300 rounded-full  absolute right-1 bottom-2 text-[40px] text-white'><GoPlus />
    </button>
    
  )
}


export default AddBtn