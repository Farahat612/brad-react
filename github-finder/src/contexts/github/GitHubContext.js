import { useReducer, createContext } from 'react'

import GitHubReducer from './GitHubReducer'
const GitHubContext = createContext()

const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: true,
  }

  const [state, dispatch] = useReducer(GitHubReducer, initialState)
  const { users, loading } = state

  const fetchUsers = async () => {
    const response = await fetch(`${URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    const data = await response.json()
    dispatch({ 
      type: 'GET_USERS', 
      payload: data
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
