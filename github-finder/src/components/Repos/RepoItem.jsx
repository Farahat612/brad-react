import PropTypes from 'prop-types'
import {
  FaEye,
  Falnfo,
  FaLink,
  FaStar,
  FaUtensils,
  FaInfo,
} from 'react-icons/fa'
const RepoItem = ({ repo }) => {
  const {
    name,
    description,
    html_url,
    forks,
    open_issues,
    watchers_count,
    stargazers_count,
    repo_url,
  } = repo
  return (
    <div className='mb-2 rounded-md card bg-gray-800 hover:bg-gray-900 cursor-pointer'>
      <div className='card-body'>
        <h3 className='mb-2 text-xl font-bold'>
          <a href={html_url} target='_blank' rel='noopener noreferrer'>
            <FaLink className='inline mr-1' /> {name}
          </a>
        </h3>
        <p className='mb-3'>{description}</p>
        <div className='flex mb-5 flex-wrap gap-1'>
          <div className='mr-2 badge badge-info badge-lg"'>
            <FaEye className='mr-2' /> {watchers_count}
          </div>
          <div className='mr-2 badge badge-success badge-lg"'>
            <FaStar className='mr-2' /> {stargazers_count}
          </div>
          <div className='mr-2 badge badge-error badge-lg"'>
            <FaInfo className='mr-2' /> {open_issues}
          </div>
          <div className='mr-2 badge badge-warning badge-lg"'>
            <FaUtensils className='mr-2' /> {forks}
          </div>
        </div>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repo: PropTypes.object.isRequired,
}

export default RepoItem
