// Desc: UserResults component to display user search results
// 1. Importing the needed modules
import { useContext } from 'react'
import GitHubContext from '../../contexts/github/GitHubContext'
import UserItem from './UserItem' // importing the UserItem component
import Spinner from '../layout/Spinner'

// 2. Creating the UserResults component
const UserResults = () => {
  // Destructuring the needed properties from the GitHubContext
  const { users, loading } = useContext(GitHubContext)

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => <UserItem key={user.id} user={user} />)
      )}
    </div>
  )
}

export default UserResults
