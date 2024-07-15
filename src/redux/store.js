import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./columnSlice";
import filterReducer from "./filterReducer";
const store = configureStore({
  reducer: { store: columnsSlice.reducer, filter: filterReducer },
});
export default store;
