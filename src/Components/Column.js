import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisVertical,
  faCircle,
  faStar,
  faSpinner,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Form from "./Form";
function Column(props) {
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const [showAddTaskModal, toggleShowAddTaskModal] = useState(false);
  const handleShowMore = () => {
    toggleShowDeleteModal(true);
  };

  const handleAddTask = () => {
    toggleShowAddTaskModal(true);
  };

  const deleteColumn = () => {};

  return (
    <div className="flex flex-col my-2 ml-2">
      <div className="flex flex-row justify-between m-2 column-header font-bold">
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
            <button type="button" onClick={handleShowMore}>
              <FontAwesomeIcon icon={faEllipsisVertical} rotation={90} />
            </button>
            {showDeleteModal && (
              <div>
                <button type="button" onClick={deleteColumn}>
                  Delete this column
                </button>
              </div>
            )}
          </div>

          <div className="add-task">
            <button type="button" onClick={handleAddTask}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {showAddTaskModal && (
              <div>
                <Form
                  colIndex={props.colIndex}
                  colName={props.singleColumn.name}
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
            className="flex flex-col gap-2 bg-white m-2 border-solid border-2 rounded-md border-grey p-2 "
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <p>#8735</p>
                <FontAwesomeIcon icon={faCircle} color="gray" fontSize={5} />
                <p>3 Jan, 4.35 PM</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faStar} fontSize={15} />
              </div>
            </div>
            <div className="font-semibold text-base max-w-xs">
              {singleTask.title}
            </div>
            <div className="flex justify-between gap-2 ">
              <div className="flex gap-2 ">
                <div className="flex justify-start rounded-full bg-red-500 px-3 py-1 text-white text-xs font-semibold">
                  <div>Critical</div>
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
                <FontAwesomeIcon
                  color="green"
                  icon={faCheckCircle}
                  fontSize={15}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
