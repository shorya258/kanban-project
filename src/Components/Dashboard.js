import React, { useState } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import columnsSlice from "../redux/columnSlice";
import FilterHeader from "./FilterHeader";
function Dashboard() {
  // const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const[showAddColModal, toggleAddColModal]=useState(false);
  const[newColName, setNewColName]= useState("");
  const dispatch= useDispatch();
  const columns = useSelector((state) => {
    return state.columns;
  });
  const addColumn=()=>{
    let newColIndex=columns.length;
    console.log("col name changed to", newColName,newColIndex )
    dispatch(columnsSlice.actions.addColumn(newColName));
    setNewColName("")
    toggleAddColModal(false);
  }
  return (
    <>
      <Header />
      <FilterHeader/>
      <div >
        {/* COLUMNS SECTIONS */}
        {columns.length > 0 ? (
          <div className="flex"  >
            {columns.map((col, index) => {
              return (
                <div key={index} className="flex-row">
                  <Column colIndex={index} singleColumn={col} />
                </div>
              );
            })}
            {
              !showAddColModal?
              <div
              onClick={()=>(toggleAddColModal(true))}
              className=" bg-[#2b2c3740] flex justify-center items-center font-bold hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] w-40 mt-[135px] rounded-lg "
            >
              + New Column
            </div>:
            <div>
              <input
              type="text"
              placeholder="Enter the column name"
              value={newColName}
              onChange={(e)=>(setNewColName( e.target.value))}
              />
              <button type="button"  onClick={addColumn} > Create</button>
            </div>
            }
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
