import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisVertical,
  faCircle,
  faStar,
  faSpinner,
  faCheckCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import columnsSlice from "../redux/columnSlice";
import Form from "./Form";
import { useDispatch } from "react-redux";
function Column(props) {
  const dispatch = useDispatch();
  const [showDeleteColumnModal, toggleShowDeleteColumnModal] = useState(false);
  const [showAddTaskModal, toggleShowAddTaskModal] = useState(false);
  const [showDeleteTaskModal, toggleDeleteTaskModal] = useState(false);
  const [showEditTaskForm, toggleShowEditTaskForm] = useState(false);
  const handleAddTask = () => {
    toggleShowAddTaskModal(!showAddTaskModal);
  };

  const deleteColumn = () => {
    dispatch(columnsSlice.actions.deleteColumn(props.colIndex));
    toggleShowDeleteColumnModal(false);
  };

  const handleDeleteTask = () => {
    toggleDeleteTaskModal(!showDeleteTaskModal);
  };
  const handleEditTask = (index) => {
    console.log(index, "index clicked");
  };
  return (
    <div className="flex flex-col my-2 ml-2">
      <div className="flex flex-row justify-between m-2 column-header font-bold">
        <div>{props.colIndex}</div>
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon
            icon={faCircle}
            color={props.singleColumn.color}
            fontSize={5}
          />
          <h4>{props.singleColumn.name}</h4>
          <p className="text-gray-600 font-light">
            {props.singleColumn.tasks.length}
          </p>
        </div>

        <div className="flex items-center">
          <div className="delete-column mr-6">
            <button
              type="button"
              onClick={() =>
                toggleShowDeleteColumnModal(!showDeleteColumnModal)
              }
            >
              <FontAwesomeIcon
                color="gray"
                icon={faEllipsisVertical}
                rotation={90}
              />
            </button>
            {showDeleteColumnModal && (
              <div>
                <button type="button" onClick={deleteColumn}>
                  Delete this column
                </button>
              </div>
            )}
          </div>

          <div className="add-task">
            <button type="button" onClick={handleAddTask}>
              <FontAwesomeIcon color="gray" icon={faPlus} />
            </button>
            {showAddTaskModal && (
              <div>
                <Form
                  colIndex={props.colIndex}
                  colName={props.singleColumn.name}
                  handleAddTask={handleAddTask}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="m-2 ">
        {props.singleColumn.tasks.map((singleTask, index) => (
          <div
            key={index}
            className="flex flex-col gap-x-2 gap-y-1 my-2 bg-white border-solid border-2 rounded-md border-grey p-2 "
            onClick={() => handleEditTask(index)}
          >
            {
              // edit task modal
              showEditTaskForm && (
                <Form
                  colIndex={props.colIndex}
                  taskIndex={index}
                  colName={props.singleColumn.name}
                  handleAddTask={handleAddTask}
                  taskDetails={singleTask}
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
                <div onClick={handleDeleteTask}>
                  <FontAwesomeIcon icon={faTrash} color="grey" />
                </div>

                {showDeleteTaskModal && (
                  <div className="flex flex-col ">
                    <div> Are you sure you want to delete this task? </div>
                    <div className="flex flex-row">
                      <div className="mx-3 my-2 p-2 bg-green-700 text-white rounded-md">
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
              {singleTask.title}
            </div>
            <div className="flex justify-between gap-2 ">
              <div className="flex gap-2 ">
                <div
                  className={`${
                    singleTask.label === "Critical"
                      ? "bg-red-600"
                      : singleTask.label === "Medium"
                      ? "bg-orange-400"
                      : "bg-yellow-300"
                  } flex justify-start rounded-full px-2 py-0.5 text-white text-xs font-semibold`}
                >
                  {<div>{singleTask.label}</div>}
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
                    color={singleTask.isVerified ? "green" : "grey"}
                    icon={faCheckCircle}
                    fontSize={15}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
