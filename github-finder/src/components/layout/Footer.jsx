import footerSvg from '../../assets/footer.svg'

const Footer = () => {
  const footerYear = new Date().getFullYear()
  return (
    <footer className='footer p-6 bg-gray-700 text-primary-content footer-center'>
      <div className='text-white'>
        <img src={footerSvg} alt='footer' />
        <p>Copyright &copy; {footerYear} All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
