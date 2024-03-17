// Code: spinner component to display the spinner whenever the data is loading
import spinnerImg from '../../assets/spinner.gif'

const Spinner = () => {
  return (
    <div className='w-100 mt-20'>
      <img
        width={180}
        className='text-center mx-auto'
        src={spinnerImg}
        alt='Loading...'
      />
    </div>
  )
}

export default Spinner
