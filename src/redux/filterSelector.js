// selectors.js
import { createSelector } from "reselect";

const getSearchFilter = (state) => state.searchFilter;
const getSortFilter = (state) => state.sortFilter;
const getItems = (state) => state.columns; // assuming you have an items array in your state

export const getFilteredAndSortedItems = createSelector(
  [getSearchFilter, getSortFilter, getItems],
  (searchFilter, sortFilter, columns) => {
    console.log(columns, searchFilter);
    let filteredColumns = columns;
    // Apply search filter
    if (searchFilter) {
      filteredColumns = columns.map((column) => {
        console.log(column.tasks, "tasks");
        return {
          name: column.name,
          color: column.color,
          tasks: column.tasks.filter((task) =>
            task.title.toLowerCase().includes(searchFilter.toLowerCase())
          ),
        };
      });
    }
    console.log(filteredColumns, "filteredColumns");

    // Apply sort filter
    if (sortFilter === "asc") {
      filteredColumns = filteredColumns.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortFilter === "desc") {
      filteredColumns = filteredColumns.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    } else if (sortFilter === "name") {
      filteredColumns = filteredColumns.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return filteredColumns;
  }
);
