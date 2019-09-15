import { useEffect } from 'react'

export const useCountdownSpeakEffect = (finishAt, now) => {
  const seconds = finishAt.diff(now, 'seconds')
  useEffect(() => {
    if (typeof window !== 'object' || !window.speechSynthesis) return

    if (seconds < 6 && seconds > 0) {
      // Uses the HTML speech API to "speak" seconds left in countdown
      const utterance = new SpeechSynthesisUtterance(seconds)
      window.speechSynthesis.speak(utterance)
    }
  }, [seconds])
}
