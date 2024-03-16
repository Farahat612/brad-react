import { useReducer, createContext } from 'react'

import GitHubReducer from './GitHubReducer'
const GitHubContext = createContext()

export const GitHubProvider = ({ children }) => {
  // Initial state for users and loading
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  // Create state and dispatch using useReducer with GitHubReducer
  const [state, dispatch] = useReducer(GitHubReducer, initialState)

  return (
    <GitHubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
