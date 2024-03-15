import PropTypes from 'prop-types'

const Button = ({children, version, type, isDisabled}) => {
  return (
    <button
      className={`btn btn-${version}`}
      type={type}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  // version: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  version: PropTypes.string,
  // type: PropTypes.oneOf(['button', 'submit', 'reset']),
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
