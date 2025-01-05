import { useSelector } from "react-redux";

const EditSubTodo = () => {
    const todo = useSelector((state) => state.todo);
    return (
        <div className="bg-opacity-30 from-black bg-gradient-to-b w-full h-full p-3">
            <h1 className="text-white text-3xl font-Barlow font-bold ">Edit Subtask</h1>
        </div>
    )
}
export default EditSubTodo;