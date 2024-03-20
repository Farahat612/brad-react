import { useState } from 'react'

// Function to get a value from local storage
const getLocalStorageValue = (key, initialValue) => {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (error) {
    console.error(error)
    return initialValue
  }
}

// Custom hook to use local storage
const useLocalStorage = (key, initialValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() =>
    getLocalStorageValue(key, initialValue)
  )

  const setValue = (value) => {
    // check if value is a function
    const valueToStore =
      value instanceof Function ? value(localStorageValue) : value
    // Save state
    setLocalStorageValue(valueToStore)
    // Save to local storage
    window.localStorage.setItem(key, JSON.stringify(valueToStore))
  }
  return [localStorageValue, setValue]
}


export default useLocalStorage
