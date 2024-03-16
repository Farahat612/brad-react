import { useEffect, useContext } from 'react'
import GitHubContext from '../contexts/github/GitHubContext'
import { useParams } from 'react-router-dom'

const User = () => {
  const { getUser, user} = useContext(GitHubContext)
  const params = useParams()
  useEffect(() => {
    getUser(params.login)
  }, [])

  return <div>{user.login}</div>
}

export default User
