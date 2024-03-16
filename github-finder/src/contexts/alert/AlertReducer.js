const alertReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALERT":
      return {
        alert: action.payload,
      };
    case "REMOVE_ALERT":
      return {
        alert: null,
      };
    default:
      return state;
  }
};

export default alertReducer;