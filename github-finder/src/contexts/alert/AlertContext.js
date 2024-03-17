// Desc: Alert Context to provide state and dispatch to components
// importing needed hooks and also the alertReducer
import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

// Creating the AlertContext
const AlertContext = createContext()

// Exporting the AlertProvider
export const AlertProvider = ({ children }) => {
  // 1. Initial state for alert
  const initialState = {
    alert: null,
  }
  // 2. Creating state and dispatch using useReducer with alertReducer
  const [state, dispatch] = useReducer(alertReducer, initialState)

  // 3. Setting and removing the alert using the dispatch
  const setAlert = (msg, type) => {
    // 3.1 Dispatching the alert with the message and the type
    dispatch({
      type: 'SET_ALERT',
      payload: { msg, type },
    })
    // 3.2 Removing the alert after 3 seconds
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_ALERT',
      })
    }, 3000)
  }

  // 4. Providing the state and dispatch to the components
  return (
    <AlertContext.Provider
      value={{
        alert: state.alert,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
