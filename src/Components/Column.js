import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEllipsisVertical,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import columnsSlice from "../redux/columnSlice";
import Form from "./Form";
import { useDispatch } from "react-redux";
import SingleTask from "./SingleTask";
function Column(props) {
  const dispatch = useDispatch();
  const [showDeleteColumnModal, toggleShowDeleteColumnModal] = useState(false);
  const [showAddTaskModal, toggleShowAddTaskModal] = useState(false);
  const addTask = (newTask) => {
    dispatch(columnsSlice.actions.addTask(newTask));
    toggleShowAddTaskModal(false);
  };
  const handleAddTask = () => {
    toggleShowAddTaskModal(!showAddTaskModal);
  };
  const deleteColumn = () => {
    dispatch(columnsSlice.actions.deleteColumn(props.colIndex));
    toggleShowDeleteColumnModal(false);
  };

  const editTask = (updatedTask, taskIndex) => {
    const colIndex = props.colIndex;
    dispatch(
      columnsSlice.actions.editTask({ colIndex, taskIndex, updatedTask })
    );
  };
  const deleteTask = (taskIndex) => {
    const colIndex = props.colIndex;
    dispatch(columnsSlice.actions.deleteTask({ colIndex, taskIndex }));
  };
  const handleDragEnd = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(
      e.dataTransfer.getData('application/json')
    );
    let colIndex=props.colIndex;
    if (props.colIndex !== prevColIndex) {
      dispatch(
        columnsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
      );
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  
  return (
    <div
      className="flex flex-col my-2 ml-2 h-full"
      onDragOver={handleDragOver}
      onDrop={handleDragEnd}
    >
      <div className="flex flex-row justify-between m-2 column-header">
        <div className="flex flex-row items-center gap-2">
          <FontAwesomeIcon
            icon={faCircle}
            color={props.singleColumn.color}
            fontSize={5}
          />
          <h4 className="font-bold">{props.singleColumn.name}</h4>
          <p className="text-gray-600 font-light">
            {props.singleColumn.tasks?.length}
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
                  addTask={addTask}
                  actionType="add"
                  handleAddTask={handleAddTask}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="m-2 ">
        {props.singleColumn.tasks?.map((singleTask, index) => (
          <div>
            <SingleTask
            key={index}
            id={index}
            colIndex={props.colIndex}
            singleTask={singleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Column;
