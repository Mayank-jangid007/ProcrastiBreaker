import { useState , createContext, useContext} from "react";
import { NavBar } from "./Components/";
import { Outlet } from "react-router-dom";
import ErrorBoundary from "./Components/ErrorBoundary";
import { AddBtn } from "./Components/";
import {AddTodo} from './Components/index'
import "./App.css";


const AppContext = createContext()
export const UseApp = () => useContext(AppContext)

function App() {
  const [show, setShow] = useState(false);
  

  const handleButtnClick = () => {
    setShow((prev) => !prev);
  };

  return (
    
    <div className="md:h-[90%] md:w-[35%] bg-black bg-opacity-40 from-black backdrop-blur-sm  bg-gradient-to-b rounded-3xl p-5 w-full h-full overflow-hidden">
      <div className="h-full w-full  bg-black rounded-3xl relative bg-opacity-30 from-black bg-gradient-to-b overflow-hidden">
        <AppContext.Provider value={{ show, setShow }}>
            <Outlet/>
          <ErrorBoundary>
            <NavBar />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <AddBtn Click={handleButtnClick} />
          </ErrorBoundary>

          <ErrorBoundary>
          </ErrorBoundary>
        </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;
