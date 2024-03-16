import { FaGithub } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title }) => {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-white'>
      <div className='container mx-auto'>
        <div className='flex-none px-2 mx-2'>
          <Link to='/'>
            <FaGithub className='inline-block pr-2 text-3xl' />
            <span className='text-lg align-middle font-bold'>{title}</span>
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='flex justify-end'>
            <Link className='btn btn-ghost btn-sm rounded-btn uppercase' to='/'>
              Home
            </Link>
            <Link
              className='btn btn-ghost btn-sm rounded-btn uppercase'
              to='/about'
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Github Finder',
}

Navbar.propTypes = {
  title: PropTypes.string,
}

export default Navbar
