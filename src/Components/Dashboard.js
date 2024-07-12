import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import boardSlice from "../redux/boardSlice";
import data from "../data.json";
function Dashboard() {
  console.log(data.boards[0].columns);

  const [cols, setCols] = useState(data.boards[0].columns);
  //   const [windowSize, setWindowSize] = useState([
  //     window.innerWidth,
  //     window.innerHeight,
  //   ]);
  // const dispatch= useDispatch();
  //   useEffect(() => {
  //     const handleWindowResize = () => {
  //       setWindowSize([window.innerWidth, window.innerHeight]);
  //     };

  //     window.addEventListener("resize", handleWindowResize);

  //     return () => {
  //       window.removeEventListener("resize", handleWindowResize);
  //     };
  //   });
 
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  console.log(boards);
  const activeBoard = boards.find((board) => board.isActive === true);
  const [columns,setColumns] = useState(activeBoard.columns);
  useEffect(() => {
   console.log("boards",boards)
  }, [])
  
  return (
    <>
      <Header />
      <div className="bg-[#d5dce6] border-black border-solid border-2 m-7 rounded-lg">
        {/* COLUMNS SECTIONS */}
        {columns.length > 0 ? (
          <div className="flex">
            {console.log(columns)}
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
      {/* <div>
        {cols.length > 0 ? (
          <div className="flex" >
            {cols.map((singleCol, index) => {
              return(
              <div key={index} className="flex flex-row hover:text-[#635FC7] transition duration-300 cursor-pointer bg-[#E9EFFA] scrollbar-hide mb-2 mx-5  mt-[135px] rounded-lg w-1/2">
              <Column name={singleCol.name} tasks={singleCol.tasks}/>
              </div>
              )
            })}
          </div>
        ) : (
          <p>add tasks</p>
        )}
      </div> */}
    </>
  );
}

export default Dashboard;
