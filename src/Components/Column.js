import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import Form from "./Form";
function Column(props) {
  
  const [showDeleteModal, toggleShowDeleteModal] = useState(false);
  const [showAddTaskModal, toggleShowAddTaskModal] = useState(false);
  const handleShowMore = () => {
    toggleShowDeleteModal(true);
    console.log("show more button clicked");
  };
  
  const handleAddTask = () => {
    toggleShowAddTaskModal(true);
    // console.log("added new task");
  };
   
  const deleteColumn = ()=>{

  }

  return (
    <div className="flex flex-col my-2 ml-2">
      <div className="flex flex-row justify-between m-2 column-header font-bold">
        <h4>{props.singleColumn.name}</h4>
        <div>
          <div className="delete-column">
            <button type="button" onClick={handleShowMore}>
              <p className="mr-3">...</p>
            </button>
            {showDeleteModal && 
            <div>
              <button type="button" onClick={deleteColumn} >Delete this column</button>
            </div>}
          </div>

          <div className="add-task">
            <button type="button" onClick={handleAddTask}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
            {showAddTaskModal &&
             <div> 
              <Form/>
              </div>}
          </div>
        </div>
      </div>
      <div className="m-2 border-solid border-2 rounded-md border-red-600 ">
        {props.singleColumn.tasks.map((singleTask, index) => (
          <div key={index} className="bg-white m-2 border-solid border-1 rounded-md border-grey " >{singleTask.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Column;
