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
      const currColumn = current(column);
      column.tasks = currColumn.tasks.map((task, j) => {
        return j === taskIndex ? updatedTask : task;
      });
    },
    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      state[colIndex].tasks.splice(taskIndex, 1);
    },
    addColumn: (state, action) => {
      console.log(action.payload);
      const colName = action.payload;
      const newCol = {
        name: colName,
        color: "cyan",
        tasks: [],
      };
      state.push(newCol);
    },

    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const prevCol = state.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      state.find((col, i) => i === colIndex).tasks.push(task);
    },
  },
});
export default columnsSlice;
