import React from "react";
import Countdown, { type CountdownRenderProps } from "react-countdown";

export default function NextCountdown() {
  const [seconds, setSeconds] = React.useState(999)

  React.useEffect(() => {
    const timeNow = new Date(new Date().toLocaleString('en', {timeZone: "Australia/Sydney"}))
    setSeconds(new Date(timeNow.getFullYear(), timeNow.getMonth(), timeNow.getDate() + 1,).getTime())
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