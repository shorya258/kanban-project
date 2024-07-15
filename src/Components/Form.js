import React, { useEffect, useState } from "react";
import columnsSlice from "../redux/columnSlice";
import { useDispatch, useSelector } from "react-redux";
import { faAngleUp, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
function Form(props) {
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    label: "",
    isVerified: false,
    status: props.colName,
    newColIndex: props.colIndex,
  });
  const [openDropdown, toggleDropDown] = useState(false);
  const handleDropDown = (labelInput) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      label: labelInput,
    }));
    toggleDropDown(false);
  };
  const handleIsVerified = () => {
    setNewTask((prevTask) => ({
      ...prevTask,
      isVerified: !newTask.isVerified,
    }));
  };
  const onChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (props.actionType === "edit") {
      props.handleEditTask();
      props.editTask(newTask, props.taskIndex);
    } else {
      props.addTask(newTask);
    }
  };

  useEffect(() => {
    if (props.actionType === "edit") {
      setNewTask(props.taskDetails);
    }
  }, []);

  return (
    <div>
      <form className="text-sm border-solid border-2 border-blue-300 rounded-sm p-3">
        <div className="task-name">
          <label htmlFor="taskName">Task Name: </label>
        </div>
        <div>
          <input
            name="title"
            type="text"
            value={newTask.title}
            onChange={onChange}
            required
            placeholder="task name"
            className="bg-blue-200 rounded-sm"
          />
        </div>
        <div className="task-description">
          <label htmlFor="taskDescription">Task Description: </label>
        </div>
        <div>
          <input
            name="description"
            type="text"
            value={newTask.description}
            onChange={onChange}
            required
            placeholder="Add a description"
            className="bg-blue-200 rounded-sm"
          />
        </div>

        {/* label */}
        <div className="cursor-auto " > 
          <div onClick={() => toggleDropDown(!openDropdown)}>

            {newTask.label ? <span>{newTask.label}</span> : <span>Severity</span>}

            {!openDropdown ? (
              <FontAwesomeIcon icon={faAngleDown} />
            ) : (
              <FontAwesomeIcon icon={faAngleUp} />
            )}
          </div>
          {openDropdown && (
            <div>
              <div
                value={newTask.label}
                onClick={() => handleDropDown("Critical")}
              >
                Critical
              </div>
              <div
                value={newTask.label}
                onClick={() => handleDropDown("Medium")}
              >
                Medium
              </div>
              <div value={newTask.label} onClick={() => handleDropDown("Low")}>
                Low
              </div>
            </div>
          )}
        </div>
        {/* is verified */}
        <div>
          <div className="cursor-auto ">
            <span>Is Verified?</span>
            {!newTask.isVerified ? (
              <div onClick={handleIsVerified}>
                <FontAwesomeIcon icon={faCircle} />
              </div>
            ) : (
              <div onClick={handleIsVerified}>
                <FontAwesomeIcon icon={faCircleCheck} color="blue" />
              </div>
            )}
          </div>
        </div>

        <button
          className="bg-blue-600 hover:bg-blue-700 rounded-full text-white m-4 p-2 text-sm"
          type="button"
          onClick={onSubmitForm}
        >
          {props.actionType === "edit" ? "Update Task" : " Add new task"}
        </button>

        {/* <div className="hover:bg-[#635FC7] bg-zinc-300">
        </div> */}
      </form>
    </div>
  );
}

export default Form;
