import {useEffect} from 'react'

export const useCountdownSpeakEffect = (seconds) => {
  // Uses the HTML speech API to "speak" seconds left in countdown
  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return

    if (seconds < 6 && seconds > 0) {
      const utterance = new SpeechSynthesisUtterance(seconds)
      window.speechSynthesis.speak(utterance)
    }
  }, [seconds])
}
