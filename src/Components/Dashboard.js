import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import columnsSlice from "../redux/columnSlice";
import FilterHeader from "./FilterHeader";
import { getFilteredAndSortedItems } from "../redux/filterSelector";
function Dashboard() {
  // const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [showAddColModal, toggleAddColModal] = useState(false);
  const [newColName, setNewColName] = useState("");
  const [sortIndex, setSortIndex] = useState("");
  const [assignedIndex, setAssignedIndex] = useState("");
  const [severityIndex, setSeverityIndex] = useState("");
  const [statusIndex, setStatusIndex] = useState("");
  const dispatch = useDispatch();
  const columns = useSelector((state) => {
    return state.columns;
  });

  const filteredAndSortedItems = useSelector(getFilteredAndSortedItems);
  const addColumn = () => {
    let newColIndex = columns.length;
    console.log("col name changed to", newColName, newColIndex);
    dispatch(columnsSlice.actions.addColumn(newColName));
    setNewColName("");
    toggleAddColModal(false);
  };
  const [assignedNames, setAssignedNames]=useState([]);

  const handleAssignedNames=()=>{
    columns?.map((singleColumn, index) => (
      singleColumn.tasks?.map((singleTask,i)=>{
        
        return setAssignedNames(...assignedNames,singleTask.assignedTo)
      }
      )
    ))
    console.log(assignedNames)
  }
  
  useEffect(() => {
    console.log("use Called");
  }, [sortIndex,assignedIndex,severityIndex,statusIndex]);
  return (
    <>
      <Header />
      <FilterHeader handleAssignedNames={handleAssignedNames}
      />
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
                className=" bg-[#2b2c3740] flex justify-center items-center font-bold hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] w-40 mt-[135px] rounded-lg "
              >
                + New Column
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Enter the column name"
                  value={newColName}
                  onChange={(e) => setNewColName(e.target.value)}
                />
                <button type="button" onClick={addColumn}>
                  {" "}
                  Create
                </button>
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
