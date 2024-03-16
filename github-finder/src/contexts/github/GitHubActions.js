const URL = process.env.REACT_APP_GITHUB_URL
const TOKEN = process.env.REACT_APP_GITHUB_TOKEN

// Search Users
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })
  const response = await fetch(`${URL}/search/users?${params}`, {
    method: 'GET',
    headers: {
      Authorization: `token ${TOKEN}`,
    },
  })
  const { items } = await response.json()
  return items
}

// Get User
export const getUser = async (login) => {
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
    return data
  }
}

// Get User Repos
export const getUserRepos = async (login) => {
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
  return data
}

