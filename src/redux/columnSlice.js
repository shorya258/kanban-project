import { createSlice, current } from "@reduxjs/toolkit";
import data from "../data.json";

const columnsSlice = createSlice({
  name: "store",
  initialState: data,
  reducers: {
    addTask: (state, action) => {
      const { title, description, status, label, isVerified, newColIndex } =
        action.payload;
      const column = state.columns.find((col, index) => {
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
      state.columns.splice(newColIndex, 1);
    },
    editTask: (state, action) => {
      const { colIndex, taskIndex, updatedTask } = action.payload;
      const column = state.columns.find((col, index) => {
        return index === colIndex;
      });
      const currColumn = current(column);
      column.tasks = currColumn.tasks.map((task, j) => {
        return j === taskIndex ? updatedTask : task;
      });
    },
    deleteTask: (state, action) => {
      const { colIndex, taskIndex } = action.payload;
      state.columns[colIndex].tasks.splice(taskIndex, 1);
    },
    addColumn: (state, action) => {
      console.log(action.payload);
      const colName = action.payload;
      const newCol = {
        name: colName,
        color: "cyan",
        tasks: [],
      };
      state.columns.push(newCol);
    },

    dragTask: (state, action) => {
      const { colIndex, prevColIndex, taskIndex } = action.payload;
      const prevCol = state.columns.find((col, i) => i === prevColIndex);
      const task = prevCol.tasks.splice(taskIndex, 1)[0];
      state.columns.find((col, i) => i === colIndex).tasks.push(task);
    },
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state[filterType] = value;
    },
    clearFilter(state, action) {
      const filterType = action.payload;
      state[filterType] = '';
    },
  },
});
export const { setFilter, clearFilter } = columnsSlice.actions;
export default columnsSlice.reducer;

