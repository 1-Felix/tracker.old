import { useState } from 'react'

const Button = () => {
  const [complete, setComplete] = useState(false)
  return (
    <button onClick={() => setComplete(!complete)} >
      {complete ? 'X' : 'O'}
    </button >
  )
}

export default Button;