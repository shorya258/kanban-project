// selectors.js
import { createSelector } from 'reselect';

const getSearchFilter = (state) => state.searchFilter;
const getSortFilter = (state) => state.sortFilter;
const getItems = (state) => state.store.columns; // assuming you have an items array in your state

export const getFilteredAndSortedItems = createSelector(
  [getSearchFilter, getSortFilter, getItems],
  (searchFilter, sortFilter, items) => {
    let filteredItems = items;
    console.log(items, searchFilter);
    // Apply search filter
    if (searchFilter) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchFilter.toLowerCase())
      );
    }

    // Apply sort filter
    if (sortFilter === 'asc') {
      filteredItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === 'desc') {
      filteredItems = filteredItems.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortFilter === 'name') {
      filteredItems = filteredItems.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filteredItems;
  }
);
