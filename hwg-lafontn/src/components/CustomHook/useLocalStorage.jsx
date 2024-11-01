import { useEffect, useState } from 'react'

const useLocalStorage = (key, initialValue) => {

  const [value, setValue] = useState(
    localStorage.getItem ? localStorage.getItem(key) : initialValue
  )

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [value, key])
  
  return [value, setValue]
}

export default useLocalStorage