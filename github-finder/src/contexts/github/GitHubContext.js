import { useState, createContext } from 'react'

const GitHubContext = createContext()

const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({ children }) => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(`${URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `token ${TOKEN}`,
      },
    })
    const data = await response.json()
    setUsers(data)
    setLoading(false)
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
