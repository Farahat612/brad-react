// Desc: GitHub API Actions to fetch data from GitHub API ---> called in Components
// importing axios for fetching data from the API
import axios from 'axios'

// 1. Setting the base URL and the token for the GitHub API
const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN
// 2. Creating an instance of axios with the base URL and the token
const github = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `token ${TOKEN}`,
  },
})

// 3. Exporting the functions to fetch data from the GitHub API
// 3.1 Get Users from the search
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })
  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// 3.2 Get User and User Repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?per_page=10&sort=created:asc`),
  ])
  return { user: user.data, repos: repos.data }
}
