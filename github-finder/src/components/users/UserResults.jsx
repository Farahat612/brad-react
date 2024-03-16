import { useState, useEffect } from 'react'
import Spinner from '../layout/Spinner'


const UserResults = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchUsers = async () => {
    const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
      method: 'GET',
      headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      },
    })
    const data = await response.json()
    setUsers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2'>
      {loading ? (
        <Spinner />
      ) : (
        users.map((user) => (
          <div key={user.id} className='flex flex-col items-center'>
            <img
              src={user.avatar_url}
              alt={user.login}
              className='w-24 h-24 rounded-full'
            />
            <h2 className='mt-4 text-xl font-bold'>{user.login}</h2>
          </div>
        ))
      )}
    </div>
  )
}

export default UserResults
