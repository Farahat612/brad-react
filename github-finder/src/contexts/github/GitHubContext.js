// Desc: GitHubContext to provide state and dispatch to components
// importing needed hooks and also the GitHubReducer
import { useReducer, createContext } from 'react'
import GitHubReducer from './GitHubReducer'

// Creating the GitHubContext
const GitHubContext = createContext()

// Exporting the GitHubProvider
export const GitHubProvider = ({ children }) => {
  // 1. Initial state for users and loading
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }
  // 2. Creating state and dispatch using useReducer with GitHubReducer
  const [state, dispatch] = useReducer(GitHubReducer, initialState)
  // 3. Providing the state and dispatch to the components
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
