import axios from 'axios'

const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

const github = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `token ${TOKEN}`,
  },
})

// Search Users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })
  const response = await github.get(`/search/users?${params}`)
  return response.data.items
}

// Get User and User Repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos?per_page=10&sort=created:asc`),
  ])
  return { user: user.data, repos: repos.data }
}
