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

  // Search Users
  const searchUsers = async (text) => {
    setLoading()
    const params = new URLSearchParams({
      q: text,
      // sort: 'followers',
      // order: 'desc',
    })
    const response = await fetch(`${URL}/search/users?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    const { items } = await response.json()
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // clear users
  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    })
  }

  return (
    <GitHubContext.Provider
      value={{
        users,
        loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
