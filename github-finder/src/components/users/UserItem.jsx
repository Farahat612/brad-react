// Desc: UserItem component to display user details in search results
// 1. Importing the needed modules
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// 2. Creating the UserItem component
const UserItem = ({ user: { login, avatar_url } }) => {
  return (
    <div className='card shadow-md compat side bg-base-100 '>
      <div className='flex-row items-center space-x-4 card-body '>
        <div className='avatar'>
          <div className='rounded-full shadow w-14 h-14'>
            <img src={avatar_url} alt='Profile' />
          </div>
        </div>
        <div>
          <h2 className='card-title'>{login}</h2>
          <Link
            className='text-base-content text-opacity-40'
            to={`/user/${login}`}
          >
            Visit Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

// 3. Adding prop types for the UserItem component
UserItem.propTypes = {
  user: PropTypes.object.isRequired,
}

export default UserItem
