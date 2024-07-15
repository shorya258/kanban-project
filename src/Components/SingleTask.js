import React, { useEffect, useState } from "react";
import Form from "./Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import {
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
    props.deleteTask(props.id);
  };
  const handleEditTask = () => {
    toggleShowEditTaskForm(!showEditTaskForm);
  };
  const handleOnDrag = (e) => {
    let taskIndex = props.id;
    let colIndex = props.colIndex;
    e.dataTransfer.setData(
      "application/json",
      JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  };
  const getMonthWiseDate = (date) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const newDay = new Date(date).getDate();
    const newMonth = months[new Date(date).getMonth()];
    return newDay + " " + newMonth;
  };
  
   

  return (
    <div draggable="false">
      <div
        className="flex flex-col gap-x-2 gap-y-1 my-2 bg-white border-solid border-2 rounded-md border-grey p-2 "
        draggable="true"
        onDragStart={handleOnDrag}
        style={{
          width: "250px",
          transition: "background-color 0.2s, border 0.2s",
          cursor: "grab",
        }}
      >
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
            <p>#{props.singleTask.ticketnum}</p>
            <FontAwesomeIcon icon={faCircle} color="gray" fontSize={3} />
            <p>{getMonthWiseDate(props.singleTask.date)}</p>
          </div>

          <div>
            <div className="flex gap-x-3">
              <div onClick={handleEditTask}>
                <FontAwesomeIcon icon={faPencil} color="grey" />
              </div>
              <div onClick={handleDeleteTask}>
                <FontAwesomeIcon icon={faTrash} color="grey" />
              </div>
            </div>

            {showDeleteTaskModal && (
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
                    <div className="flex bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 justify-center">
                    <div className="flex flex-col align-middle justify-center ">
                    <div> Are you sure you want to delete this task? </div>
                    <div className="flex flex-row justify-center align-middle w-full">
                      <div
                        className="mx-3 my-2 p-2 bg-green-700 text-white rounded-md"
                        onClick={handleDeleteTask}
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
                    </div>
                  </div>
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
                color={props.singleTask.isVerified ? "blue" : "grey"}
                icon={faCheckCircle}
                fontSize={15}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleTask;
