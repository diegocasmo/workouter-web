import {useEffect, useRef} from 'react'

// Taken from: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback
  useEffect(_ => { savedCallback.current = callback })

  // Set up the interval
  useEffect(() => {
    const tick = _ => {
      savedCallback.current()
    }

    if (delay !== null) {
      let id = setInterval(tick, delay)
      return _ => clearInterval(id)
    }
  }, [delay])
}
