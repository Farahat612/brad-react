import { useReducer, createContext } from 'react'

import GitHubReducer from './GitHubReducer'
const GitHubContext = createContext()

const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  // Initial state for users and loading
  const initialState = {
    users: [],
    loading: false,
  }

  // Create state and dispatch using useReducer with GitHubReducer
  const [state, dispatch] = useReducer(GitHubReducer, initialState)
  const { users, loading } = state

  // Set Loading
  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  // Fetch Users just for testing purposes
  const fetchUsers = async () => {
    setLoading()
    const response = await fetch(`${URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    const data = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: data,
    })
  }

  return (
    <GitHubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
