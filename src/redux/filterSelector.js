// selectors.js
import { createSelector } from "reselect";

const getSearchFilter = (state) => state.searchFilter;
const getSortFilter = (state) => state.sortFilter;
const getSeverityFilter = (state) => state.severityFilter;
const getStatusFilter = (state) => state.statusFilter;
const getAssignedFilter = (state) => state.assignedFilter;
const getItems = (state) => state.columns;
export const getStatusList = (state) =>
  state.columns.map((column) => column.name);

export const getAssignedList = (state) => {
  const assignedNamesList = [];
  state.columns.forEach((column) =>
    column.tasks.forEach((task) => assignedNamesList.push(task.assignedTo))
  );
  return [...new Set(assignedNamesList)];
};
// assuming you have an items array in your state

export const getFilteredAndSortedItems = createSelector(
  [
    getSearchFilter,
    getSortFilter,
    getSeverityFilter,
    getStatusFilter,
    getAssignedFilter,
    getItems
  ],
  (searchFilter, sortFilter, severityFilter, statusFilter, assignedFilter, columns) => {
    let filteredColumns = columns;

    if (statusFilter) {
      console.log(statusFilter, "statusFilter");
      filteredColumns = filteredColumns.filter((column) => {
        return column.name.toLowerCase() === statusFilter.toLowerCase();
      });
    }
    // Apply search filter
    if (searchFilter) {
      filteredColumns = filteredColumns?.map((column) => {
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
    if (severityFilter) {
      console.log(severityFilter, "severityFilter");
      filteredColumns = filteredColumns?.map((column) => {
        return {
          name: column.name,
          color: column.color,
          tasks: column.tasks.filter(
            (task) => task.label.toLowerCase() === severityFilter.toLowerCase()
          ),
        };
      });
    }

    if (assignedFilter) {
      console.log(assignedFilter, "assignedFilter");
      filteredColumns = filteredColumns?.map((column) => {
        return {
          name: column.name,
          color: column.color,
          tasks: column.tasks.filter(
            (task) => task.assignedTo.toLowerCase() === assignedFilter.toLowerCase()
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
