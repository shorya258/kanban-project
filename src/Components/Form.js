import React, { useEffect, useState } from "react";
import {
  faAngleUp,
  faCircleCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
function Form(props) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    label: "",
    isVerified: false,
    status: props.colName,
    newColIndex: props.colIndex,
  });
  const [openDropdown, toggleDropDown] = useState(false);
  const [errorsObj, setErrorsIbj] = useState({});
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
    if (validateFormValues(newTask)) return;
    if (props.actionType === "edit") {
      props.handleEditTask();
      props.editTask(newTask, props.taskIndex);
    } else {
      props.addTask(newTask);
    }
  };
  const onFormClose = () => {
    if (props.actionType === "edit") {
      props.handleEditTask();
    } else {
      props.handleAddTask();
    }
  };
  const validateFormValues = (newTask) => {
    const generatedErrors = {};
    var errorFound = false;
    console.log(typeof newTask.title);
    if (newTask.title?.length === 0) {
      generatedErrors.title = "*Task name can not be empty.";
      errorFound = true;
    } else if (newTask.title?.length < 4) {
      generatedErrors.title = "*Task name should have at least 4 characters.";
      errorFound = true;
    }
    if (newTask.description?.length === 0) {
      generatedErrors.description = "*Description can not be empty.";
      errorFound = true;
    } else if (newTask.Description?.length < 4) {
      generatedErrors.Description =
        "*Description should have at least 4 characters.";
      errorFound = true;
    }
    if (newTask.label?.length === 0) {
      generatedErrors.label = "*Choose a label.";
      errorFound = true;
    }
    setErrorsIbj(generatedErrors);
    return errorFound;
  };
  useEffect(() => {
    if (props.actionType === "edit") {
      setNewTask(props.taskDetails);
    }
  }, []);

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <FontAwesomeIcon
              className="absolute right-4 top-4 cursor-pointer"
              icon={faXmark}
              fontSize={20}
              onClick={onFormClose}
            />
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <form className="text-sm p-3 flex flex-col gap-y-2">
                <div className="task-name">
                  <label htmlFor="taskName">Task Name </label>
                </div>
                <div>
                  <input
                    name="title"
                    type="text"
                    value={newTask.title}
                    onChange={onChange}
                    required
                    placeholder="task name"
                    className="bg-blue-200 rounded-sm w-full py-1 px-3"
                  />
                  {errorsObj !== undefined && errorsObj.title !== undefined && (
                    <legend className="text-red-500 italic font-thin">
                      {errorsObj.title}
                    </legend>
                  )}
                </div>
                <div className="task-description">
                  <label htmlFor="taskDescription">Task Description </label>
                </div>
                <div>
                  <input
                    name="description"
                    type="text"
                    value={newTask.description}
                    onChange={onChange}
                    required
                    placeholder="Add a description"
                    className="bg-blue-200 rounded-sm w-full py-1 px-3"
                  />
                  {errorsObj !== undefined &&
                    errorsObj.description !== undefined && (
                      <legend className="text-red-500 italic font-thin">
                        {errorsObj.description}
                      </legend>
                    )}
                </div>

                {/* label */}
                <div className="cursor-auto ">
                  <div onClick={() => toggleDropDown(!openDropdown)}>
                    {newTask.label ? (
                      <span>{newTask.label}</span>
                    ) : (
                      <span>Severity</span>
                    )}

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
                      <div
                        value={newTask.label}
                        onClick={() => handleDropDown("Low")}
                      >
                        Low
                      </div>
                    </div>
                  )}
                </div>
                {errorsObj !== undefined && errorsObj.label !== undefined && (
                  <legend className="text-red-500 italic font-thin">
                    {errorsObj.label}
                  </legend>
                )}
                {/* is verified */}
                <div>
                  <div className="cursor-auto flex gap-x-2">
                    <span>Is Verified?</span>
                    {!newTask.isVerified ? (
                      <div onClick={handleIsVerified}>
                        <FontAwesomeIcon icon={faCircle} />
                      </div>
                    ) : (
                      <div onClick={handleIsVerified}>
                        <FontAwesomeIcon icon={faCircleCheck} color="green" />
                      </div>
                    )}
                  </div>
                </div>

                <button
                  className="bg-blue-600 hover:bg-blue-700 rounded-full text-white m-4 p-2 text-sm w-40 self-center"
                  type="button"
                  onClick={onSubmitForm}
                >
                  {props.actionType === "edit"
                    ? "Update Task"
                    : " Add new task"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
