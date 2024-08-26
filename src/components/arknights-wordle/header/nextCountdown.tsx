import React from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";

export default function NextCountdown() {
  const [seconds, setSeconds] = React.useState(999)

  React.useEffect(() => {
    // get time from australia 
    // calculate time to midnight in australia
    const timeString = new Date().toLocaleTimeString('en', {timeZone: 'Australia/Sydney', hour12: false})

    const time: string[] = timeString.split(":")

    if (time.length === 3) {
      // Need exclamation because split could be undefined even with the > 3 check
      const seconds = 86400 - (parseInt(time[0]!) * 60 * 60 + parseInt(time[1]!) * 60 + parseInt(time[2]!)) 
      setSeconds(new Date().getTime() + seconds * 1000)
    } else {
      setSeconds(-1)
      alert("Timer has gone haywire, please submit a bug report")
    }
  }, [])

  const countdownRef = React.useRef(null)

  setTimeout(() => (countdownRef.current as unknown as Countdown)?.start(), 1000)

  const redererProp = ({hours, minutes, seconds} : CountdownRenderProps) => {
    const hrs = String(hours).padStart(2, '0')
    const mins = String(minutes).padStart(2, '0')
    const secs = String(seconds).padStart(2, '0')
    return (
      <div className="flex justify-center items-center">
        <div className="text-left w-[176px] overflow-x-visible">
          <p className="whitespace-nowrap">The next Wordle is in {hrs}:{mins}:{secs}</p>
        </div>
      </div>
    )
  }

  return (
    <Countdown date={seconds} autoStart={false} ref={countdownRef} renderer={(props: CountdownRenderProps) => redererProp(props)}/>
  )
}