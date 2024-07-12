import React, { useState } from "react";
import boardsSlice from "../redux/boardSlice";
import { useDispatch } from "react-redux";
function Form() {

  const dispatch = useDispatch();
  
  const [newTask, setNewTask] = useState({
    taskName: "",
    taskDescription: "",
    status: "Todo",
    newColIndex: 0,
  });
  const onChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    console.log(e);
    e.preventDefault();
    console.log("added task");
    dispatch(boardsSlice.actions.addTask(newTask, "ADD"));
  };
  return (
    <div>
      <form>
        <div className="task-name">
          <label htmlFor="taskName">Task Name: </label>
        </div>
        <div>
          <input
            name="taskName"
            type="text"
            value={newTask.taskName}
            onChange={onChange}
            placeholder="task name"
          />
        </div>
        <div className="task-description">
          <label htmlFor="taskDescription">Task Name: </label>
        </div>
        <div>
          <input
            name="taskDescription"
            type="text"
            value={newTask.taskDescription}
            onChange={onChange}
            placeholder="Add a description"
          />
        </div>
          <button type="button" onClick={onSubmitForm}>
            Add new task
          </button>
        {/* <div className="hover:bg-[#635FC7] bg-zinc-300">
        </div> */}
      </form>
    </div>
  );
}

export default Form;
