// Desc: Alert Reducer to set and remove the alert
const alertReducer = (state, action) => {
  switch (action.type) {
    // Setting the alert with the message and the type
    case 'SET_ALERT':
      return {
        alert: action.payload,
      }
    // Removing the alert
    case 'REMOVE_ALERT':
      return {
        alert: null,
      }
    default:
      return state
  }
}

export default alertReducer
