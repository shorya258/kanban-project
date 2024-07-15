export const setFilter = (filterType, value) => ({
  type: "SET_FILTER",
  payload: { filterType, value },
});

export const clearFilter = (filterType) => ({
  type: "CLEAR_FILTER",
  payload: { filterType },
});
