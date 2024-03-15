
const RatingSelect = ({selected, setSelected}) => {

  const handleChange = (e) => {
    setSelected(Number(e.currentTarget.value))
  }
  return (
    <ul className='rating'>
      {[...Array(10)].map((_, index) => (
        <li key={`rating-${index + 1}`}>
          <input
            type='radio'
            id={`num${index + 1}`}
            name='rating'
            value={index + 1}
            checked={selected === index + 1}
            onChange={handleChange}
          />
          <label htmlFor={`num${index + 1}`}>{index + 1}</label>
        </li>
      ))}
    </ul>
  )
}

export default RatingSelect
