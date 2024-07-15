import React, { useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
function Dashboard() {
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  
  const columns = useSelector((state) => {
    return state.columns;
  });
  return (
    <>
      <Header />
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
            <div
              onClick={() => {
                setIsBoardModalOpen(true);
              }}
              className=" bg-[#2b2c3740] flex justify-center items-center font-bold hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2   mx-5 pt-[90px] w-40 mt-[135px] rounded-lg "
            >
              + New Column
            </div>
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
