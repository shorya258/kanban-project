
const initialState = {
  searchFilter: '',
  sortFilter: '',
  // other state properties
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FILTER":
      return {
        ...state,
        [action.payload.filterType]: action.payload.value,
      };
    case "CLEAR_FILTER":
      return {
        ...state,
        [action.payload.filterType]: '',
      };
    // handle other actions
    default:
      return state;
  }
};

export default filterReducer;
