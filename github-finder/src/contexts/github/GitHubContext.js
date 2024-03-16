import { useReducer, createContext } from 'react'

import GitHubReducer from './GitHubReducer'
const GitHubContext = createContext()

const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

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
  const { users, user, loading, repos } = state

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

  // Get User
  const getUser = async (login) => {
    setLoading()
    const response = await fetch(`${URL}/users/${login}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    if (response.status === 404) {
      window.location.href = '/notfound'
    } else {
      const data = await response.json()
      dispatch({
        type: 'GET_USER',
        payload: data,
      })
    }
  }

  // Get User Repos
  const getUserRepos = async (login) => {
    setLoading()
    const params = new URLSearchParams({
      sort: 'created: asc',
      per_page: 10,
    })
    const response = await fetch(`${URL}/users/${login}/repos?${params}`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    const data = await response.json()
    dispatch({
      type: 'GET_REPOS',
      payload: data,
    })
  }

  return (
    <GitHubContext.Provider
      value={{
        users,
        loading,
        searchUsers,
        clearUsers,
        user,
        getUser,
        repos,
        getUserRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  )
}

export default GitHubContext
