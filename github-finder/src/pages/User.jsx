// Desc: User Page component to display user details and repos
// importing the needed hooks and packages from react and react-router-dom
import { useEffect, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
// importing the GitHubContext and the getUserAndRepos action
import GitHubContext from '../contexts/github/GitHubContext'
import { getUserAndRepos } from '../contexts/github/GitHubActions'
// importing the needed icons and assets
import { FaCodepen, FaStore, FaUserFriends, FaUsers } from 'react-icons/fa'
import Spinner from '../components/layout/Spinner'
// importing the ListOfRepos component
import ListOfRepos from '../components/Repos/ListOfRepos'

// Creating the User component
const User = () => {
  // 1. Destructuring the needed properties from the GitHubContext
  const { user, loading, repos, dispatch } = useContext(GitHubContext)
  // 2. Using the useParams hook to get the user login [username] from the URL
  const params = useParams()
  // 3. Using the useEffect hook to fetch the user and repos data from the GitHub API
  useEffect(() => {
    // 3.1 setting the loading state to true
    dispatch({ type: 'SET_LOADING' })
    // 3.2 creating and calling an async function to fetch the user and repos data
    const fetchUserData = async () => {
      const userData = await getUserAndRepos(params.login)
      dispatch({ type: 'GET_USER_AND_REPOS', payload: userData })
    }
    fetchUserData()
  }, [dispatch, params.login])

  // 4. Destructuring the needed properties from the user object
  const {
    name,
    type,
    avatar_url,
    location,
    bio,
    blog,
    twitter_username,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user
  // 5. Creating the websiteUrl variable to check if the blog property starts with http or not
  const websiteUrl = blog?.startsWith('http') ? blog : 'https://' + blog

  // 6. Returning the User component
  if (loading) return <Spinner />
  return (
    <>
      <div className='w-full mx-auto lg:w-10/12'>
        <div className='mb-4'>
          <Link to='/' className='btn btn-ghost'>
            Back to Search
          </Link>
        </div>
        <div className='grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
          <div className='custom-card-image mb-6 md:mb-0'>
            <div className='rounded-lg shadow-xl card image-full'>
              <figure>
                <img src={avatar_url} alt='Avatar' />
              </figure>
              {/* <div className="card-body justify-end test-white">
                <h2 className="card-title mb-0">{name}</h2>
                <p>{login}</p>
              </div> */}
            </div>
          </div>

          <div className='col-span-2'>
            <div className='mb-6'>
              <h1 className='text-3xl card-title'>
                {name}
                <p className='ml-2 mr-1 badge badge-success'>{type}</p>
                {hireable && <p className='mx-1 badge badge-info'>Hireable</p>}
              </h1>
              <p>{bio}</p>
              <div className='mt-4 card-actions'>
                <a
                  href={html_url}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-outline uppercase font-bold'
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>

            <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
              {location && (
                <div className='stat'>
                  <div className='stat-title text-md'>Location</div>
                  <div className='text-lg stat-value'>{location}</div>
                </div>
              )}
              {blog && (
                <div className='stat'>
                  <div className='stat-title text-md'>Website</div>
                  <div className='text-lg stat-value'>
                    <a href={websiteUrl} target='_blank' rel='noreferrer'>
                      {websiteUrl}
                    </a>
                  </div>
                </div>
              )}
              {twitter_username && (
                <div className='stat'>
                  <div className='stat-title text-md'>Twitter</div>
                  <div className='text-lg stat-value'>
                    <a
                      href={`https://twitter.com/${twitter_username}`}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {twitter_username}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
          <div className='grid grid-cols-1 md:grid-cols-3'>
            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaUsers className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Followers</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {followers}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaUserFriends className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Following</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {following}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaCodepen className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Repos</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_repos}
              </div>
            </div>

            <div className='stat'>
              <div className='stat-figure text-secondary'>
                <FaStore className='text-3xl md:text-5xl' />
              </div>
              <div className='stat-title pr-5'>Public Gists</div>
              <div className='stat-value pr-5 text-3xl md:text-4xl'>
                {public_gists}
              </div>
            </div>
          </div>
        </div>

        <ListOfRepos repos={repos} />
      </div>
    </>
  )
}

export default User
