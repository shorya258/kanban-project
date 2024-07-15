import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data.json";

const columnsSlice = createSlice({
  name: "columns",
  initialState: data.columns,
  reducers: {
    addTask: (state, action) => {
      const { title, description, status, label, isVerified, newColIndex } =
        action.payload;
      const column = state.find((col, index) => {
        return index === newColIndex;
      });
      const task = {
        title,
        description,
        status,
        label,
        isVerified,
        newColIndex,
      };
      column.tasks.push(task);
    },
    deleteColumn: (state, action) => {
      const { newColIndex } = action.payload;
      state.splice(newColIndex, 1);
    },
    editTask: (state, action) => {
      const { colIndex, taskIndex, updatedTask } = action.payload;
      const column = state.find((col, index) => {
        return index === colIndex;
      });
      const currColumn=current(column);
      column.tasks=currColumn.tasks.map((task, j) => {
        return j === taskIndex ? updatedTask : task;
      })
    },
    deleteTask: (state,action)=>{
      const {colIndex, taskIndex}= action.payload;
      state[colIndex].tasks.splice(taskIndex,1)
    },
    addColumn:(state,action)=>{
      console.log(action.payload)
      const  colName =action.payload;
      const newCol= {
        name: colName,
        color:"cyan",
        tasks:[],
      }
      // const newCol=action.payload;
      state.push(newCol)
      // todo
    }

    // dragTask: (state, action) => {
    //   const { colIndex, prevColIndex, taskIndex } = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const prevCol = board.columns.find((col, i) => i === prevColIndex);
    //   const task = prevCol.tasks.splice(taskIndex, 1)[0];
    //   board.columns.find((col, i) => i === colIndex).tasks.push(task);
    // },
    // setSubtaskCompleted: (state, action) => {
    //   const payload = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const col = board.columns.find((col, i) => i === payload.colIndex);
    //   const task = col.tasks.find((task, i) => i === payload.taskIndex);
    //   const subtask = task.subtasks.find((subtask, i) => i === payload.index);
    //   subtask.isCompleted = !subtask.isCompleted;
    // },
    // setTaskStatus: (state, action) => {
    //   const payload = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const columns = board.columns;
    //   const col = columns.find((col, i) => i === payload.colIndex);
    //   if (payload.colIndex === payload.newColIndex) return;
    //   const task = col.tasks.find((task, i) => i === payload.taskIndex);
    //   task.status = payload.status;
    //   col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    //   const newCol = columns.find((col, i) => i === payload.newColIndex);
    //   newCol.tasks.push(task);
    // },
    // deleteTask: (state, action) => {
    //   const payload = action.payload;
    //   const board = state.find((board) => board.isActive);
    //   const col = board.columns.find((col, i) => i === payload.colIndex);
    //   col.tasks = col.tasks.filter((task, i) => i !== payload.taskIndex);
    // },
  },
});
export default columnsSlice;
