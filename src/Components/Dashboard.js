import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import { addColumn } from "../redux/columnSlice";
import FilterHeader from "./FilterHeader";
import { getFilteredAndSortedItems } from "../redux/filterSelector";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Dashboard() {
  // const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [showAddColModal, toggleAddColModal] = useState(false );
  const [newColName, setNewColName] = useState("");
  const dispatch = useDispatch();
  const columns = useSelector((state) => {
    return state.columns;
  });

  const filteredAndSortedItems = useSelector(getFilteredAndSortedItems);
  const addNewColumn = () => {
    let newColIndex = columns.length;
    console.log("col name changed to", newColName, newColIndex);
    dispatch(addColumn(newColName));
    setNewColName("");
    toggleAddColModal(false);
  };
  return (
    <>
      <Header />
      <FilterHeader />
      <div>
        {/* COLUMNS SECTIONS */}
        {filteredAndSortedItems.length > 0 ? (
          <div className="flex">
            {filteredAndSortedItems.map((col, index) => {
              return (
                <div key={index} className="flex-row">
                  <Column colIndex={index} singleColumn={col} />
                </div>
              );
            })}
            {!showAddColModal ? (
              <div
                onClick={() => toggleAddColModal(true)}
                className=" bg-[#2b2c3740] flex justify-center items-center font-bold hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] w-40 mt-5 rounded-lg "
              >
                + New Column
              </div>
            ) : (
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
                      onClick={() => toggleAddColModal(false)}
                    />
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <form className="text-sm p-3 flex flex-col gap-y-2">
                        <div className="task-name">
                          <label htmlFor="taskName"> Column Name </label>
                        </div>
                        <div>
                          <input
                            name="title"
                            type="text"
                            value={newColName}
                            onChange={(e) => setNewColName(e.target.value)}
                            required
                            placeholder="Enter the column name"
                            className="bg-blue-200 rounded-sm w-full py-1 px-3"
                          />
                          {/* {errorsObj !== undefined && errorsObj.title !== undefined && (
                            <legend className="text-red-500 italic font-thin">
                              {errorsObj.title}
                            </legend>
                          )} */}
                        </div>
        
                        <button
                          className="bg-blue-600 hover:bg-blue-700 rounded-full text-white m-4 p-2 text-sm w-40 self-center"
                          type="button"
                          onClick={addNewColumn}
                        >
                          Create
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        ) : (
          <>
            <EmptyBoard type="edit" />
          </>
        )}
      </div>
    </>
  );
}

export default Dashboard;
