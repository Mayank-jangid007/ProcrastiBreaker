import { createSlice, nanoid} from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const STORAGE_KEY = 'Tasks'; 
const STORAGE_USER = 'User'; 

const isLocalStorageEmpty = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return !data || data === '[]' || data === '{}'; 
};

const loadUserFromStorage = () => {
    try {
        const userData = localStorage.getItem(STORAGE_USER);
        if (!userData) return {
            isAuthenticated: false,
            email: null,
            name: null
        };

        const parsedUser = JSON.parse(userData);
        return {    
            isAuthenticated: parsedUser.isAuthenticated || false,
            email: parsedUser.email || null,
            name: parsedUser.name || null
        };
    } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem(STORAGE_USER);
        return {
            isAuthenticated: false,
            email: null,
            name: null
        };
    }

}

const initialState = {
    todo:(() => { 
        if (isLocalStorageEmpty()) { 
            return [];
        }
        
        const getTodo = localStorage.getItem(STORAGE_KEY); 
        try { 
            const parsedTodos = getTodo ? JSON.parse(getTodo) : [];
                
            return Array.isArray(parsedTodos) ? parsedTodos : []; 

        } catch (error) {
            console.error('Error parsing todos:', error);
            localStorage.removeItem(STORAGE_KEY); 
            return [];
        }
       

    })(), 
        
    // Initial Load hoga state ka 
    //IIFE executes → localStorage check → set initial state

    //  After Initial Load hoga state ka
    //Component renders -> useSelector call → gets current state from Redux store 
    user:loadUserFromStorage()
};


export const TodoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            // Update state
            state.user = { 
                isAuthenticated: true,
                email: action.payload.email,
                name: action.payload.name
            };
            
            // Save to localStorage
            localStorage.setItem(STORAGE_USER, JSON.stringify(state.user));
        },

        logoutUser:(state, action) =>{
            state.user = {
                isAuthenticated: false,
                email:  null,
                name: null
            }
           
            localStorage.setItem(STORAGE_USER, JSON.stringify(state.user));
        },

        createTodo: (state,action) =>{ 
            const todos = {
                id: nanoid(),
                TodoMsg: action.payload.TodoMsg,
                isEditable: false,
                day: action.payload.day,
                img: action.payload.img,
                Description: action.payload.Description,
                userId: state.user.email,
                SubTask:[]
            }

            const isDuplicate = state.todo.some(
                todo => todo.TodoMsg === todos.TodoMsg
            );
            !isDuplicate? state.todo.push(todos) : console.log("Duplicate hai");  
            
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todo)) 
           
        },

        clearTodos: (state) => {
            state.todo = [];
            localStorage.removeItem(STORAGE_KEY);
        },

        addSubTask: (state, action) =>{ 
            const { parentId, subTask } = action.payload
            const parentTodo = state.todo.find(todo => todo.id === parentId) 
            if(parentTodo){ 
                
                const isDuplicate = parentTodo.SubTask.some(
                    task => task.TodoMsg === subTask
                );
            
                if (!isDuplicate) {
                    parentTodo.SubTask.push({
                        id: uuidv4(),
                        TodoMsg: subTask,
                        isEditable: false
                    });
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todo)) 
                    
                }
            }
        },

        toggleSubTaskStatus:(state, action) =>{
            const { subId, parentId } = action.payload;
            const parentTodo = state.todo.find(todo => todo.id === parentId)

            if(parentTodo){
                const subTodo = parentTodo.SubTask.find(sub => sub.id === subId)
                if(subTodo){
                    const updatedSubTask = {
                        ...subTodo,
                        isEditable: !subTodo.isEditable 
                    }
                    
                    const subTaskIndex = parentTodo.SubTask.findIndex(sub => sub.id === subId);
                    parentTodo.SubTask[subTaskIndex] = updatedSubTask;
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todo))

                    console.log('Parent todo:', JSON.parse(JSON.stringify(state.todo))); 
                }
            }
        },


        updateTodo: (state, action) =>{
            const {id, ...formData} = action.payload 
            state.todo =  state.todo.map(todo => todo.id == id ? { ...todo, ...formData} : todo) 
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state.todo))
        },

        deleteTodo: (state,action) =>{
            state.todo = state.todo.filter((todo) => todo.id !== action.payload)
            localStorage.setItem("Tasks", JSON.stringify(state.todo))
        }
    }
});

export const { createTodo, deleteTodo, addSubTask, clearSubTasks, clearTodos, toggleSubTaskStatus , updateTodo, loginUser, logoutUser} = TodoSlice.actions;
export default TodoSlice.reducer
