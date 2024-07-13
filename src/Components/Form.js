import React, { useState } from "react";
import columnsSlice from "../redux/columnSlice";
import { useDispatch } from "react-redux";
function Form(props) {

  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: props.colName,
    newColIndex: props.colIndex,
  });
  const onChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    dispatch(columnsSlice.actions.addTask(newTask));
  };
  return (
    <div>
      <form>
        <div className="task-name">
          <label htmlFor="taskName">Task Name: </label>
        </div>
        <div>
          <input
            name="title"
            type="text"
            value={newTask.title}
            onChange={onChange}
            placeholder="task name"
          />
        </div>
        <div className="task-description">
          <label htmlFor="taskDescription">Task Name: </label>
        </div>
        <div>
          <input
            name="description"
            type="text"
            value={newTask.description}
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
