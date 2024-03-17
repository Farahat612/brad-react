// Desc: UserSearch component to search for users
// Importing the needed hooks, contexts, and actions
import { useState, useContext } from 'react'
import GitHubContext from '../../contexts/github/GitHubContext'
import AlertContext from '../../contexts/alert/AlertContext'
import { searchUsers } from '../../contexts/github/GitHubActions'

// Creating the UserSearch component
const UserSearch = () => {
  // Destructuring the needed properties from the GitHubContext and the AlertContext
  const { users, dispatch } = useContext(GitHubContext)
  const { setAlert } = useContext(AlertContext)

  // Creating the text state and the handleChange and handleSubmit functions
  const [text, setText] = useState('')
  const handleChange = (e) => setText(e.target.value)
  // Creating the handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (text === '') {
      setAlert('Please enter something', 'error') // displaying an alert if the search input is empty
    } else {
      dispatch({ type: 'SET_LOADING' }) // setting loading to true
      const users = await searchUsers(text) // fetching the users from the GitHub API using the searchUsers action
      dispatch({ type: 'GET_USERS', payload: users }) // Filling the users state in the GitHubContext
      setText('')
    }
  }
  // Creating the handleClear function for pressing the clear button
  const handleClear = () => {
    dispatch({ type: 'CLEAR_USERS' })
  }

  return (
    <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
      <div>
        <form onSubmit={handleSubmit}>
          <div className='form-control'>
            <div className='relative'>
              <input
                type='text'
                className='w-full pr-40 bg-gray-200 input input-lg text-black'
                placeholder='Search Users...'
                value={text}
                onChange={handleChange}
              />
              <button
                type='submit'
                className='absolute top-0 right-0 rounded-l-none w-36 btn btn-lg'
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className='btn btn-ghost btn-lg' onClick={handleClear}>
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default UserSearch
