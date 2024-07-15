import React, { useState } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faEllipsisVertical,
  faStar,
  faSpinner,
  faCheckCircle,
  faTrash,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
function SingleTask(props) {
  const [showDeleteTaskModal, toggleDeleteTaskModal] = useState(false);
  const [showEditTaskForm, toggleShowEditTaskForm] = useState(false);
  const handleDeleteTask = () => {
    toggleDeleteTaskModal(!showDeleteTaskModal);
  };
  const handleEditTask = () => {
    toggleShowEditTaskForm(!showEditTaskForm);
  };

  return (
    <div className="flex flex-col gap-x-2 gap-y-1 my-2 bg-white border-solid border-2 rounded-md border-grey p-2 ">
      {
        // edit task modal
        showEditTaskForm && (
          <Form
            colIndex={props.colIndex}
            taskIndex={props.id}
            taskDetails={props.singleTask}
            handleEditTask={handleEditTask}
            editTask={props.editTask}
            actionType="edit"
          />
        )
      }
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-x-2 text-xs text-gray-600">
          <p>#8735</p>
          <FontAwesomeIcon icon={faCircle} color="gray" fontSize={3} />
          <p>3 Jan, 4.35 PM</p>
        </div>

        <div>
          <div onClick={handleEditTask}>
            <FontAwesomeIcon icon={faPencil} />
          </div>
          <div onClick={handleDeleteTask}>
            <FontAwesomeIcon icon={faTrash} color="grey" />
          </div>

          {showDeleteTaskModal && (
            <div className="flex flex-col ">
              <div> Are you sure you want to delete this task? </div>
              <div className="flex flex-row">
                <div
                  className="mx-3 my-2 p-2 bg-green-700 text-white rounded-md"
                  onClick={() => props.deleteTask(props.id)}
                >
                  Yes
                </div>
                <div
                  className="mr-3 my-2 p-2 bg-red-600 text-white rounded-md"
                  onClick={handleDeleteTask}
                >
                  No
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <FontAwesomeIcon icon={faStar} fontSize={15} />
        </div>
      </div>
      <div className="font-semibold text-base max-w-xs mb-2">
        {props.singleTask.title}
      </div>
      <div className="flex justify-between gap-2 ">
        <div className="flex gap-2 ">
          <div
            className={`${
              props.singleTask.label === "Critical"
                ? "bg-red-600"
                : props.singleTask.label === "Medium"
                ? "bg-orange-400"
                : "bg-yellow-300"
            } flex justify-start rounded-full px-2 py-0.5 text-white text-xs font-semibold`}
          >
            {<div>{props.singleTask.label}</div>}
          </div>
          <div className="flex items-center gap-2 justify-start rounded-full bg-cyan-200 px-3 py-1 text-white text-xs font-semibold">
            <FontAwesomeIcon icon={faStar} fontSize={10} />
            <p>Hypejab</p>
          </div>
          <div className="flex items-center gap-x-1">
            <FontAwesomeIcon icon={faSpinner} fontSize={10} />
            <p>4.5</p>
          </div>
        </div>
        <div>
          <div>
            <FontAwesomeIcon
              color={props.singleTask.isVerified ? "green" : "grey"}
              icon={faCheckCircle}
              fontSize={15}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTask;
