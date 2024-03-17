// Desc: List of Repositories Component
// Importing the RepoItem component and also PropTypes
import PropTypes from 'prop-types'
import RepoItem from './RepoItem'

// Creating the ListOfRepos component
const ListOfRepos = ({ repos }) => {
  return (
    <div className='rounded-ls shadow-lg card bg-base-100'>
      <div className='card-body'>
        <h2 className='text-3xl my-4 font-bold card-title'>
          Latest Repositories
        </h2>
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
          {/* Mapping over the list to render RepoItem component for each item in the list */}
          {repos.map((repo) => (
            <RepoItem key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Setting the PropTypes for the ListOfRepos component
ListOfRepos.propTypes = {
  repos: PropTypes.array.isRequired,
}

export default ListOfRepos
