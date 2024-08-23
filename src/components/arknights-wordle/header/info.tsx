import LogoBlack from "../../../../public/logo_black.svg";
import LogoWhite from "../../../../public/logo_white.svg";
import Image from "next/image";
import VersionLog from "./versions";
import React from "react";
import { GameModeContext, ThemeContext } from "~/pages";
import Countdown, { type CountdownRenderProps } from "react-countdown";

export default function Info() {
  const { stats } = React.useContext(GameModeContext)
  const { darkMode } = React.useContext(ThemeContext)
  
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
        <div className="text-left w-[140px] overflow-x-visible">
          <p className="whitespace-nowrap">Next Wordle in {hrs}:{mins}:{secs}</p>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* The preload issue does not go away... Fix later??? */}
      <Image
        width={416}
        height={72}
        src={`${darkMode ? LogoWhite.src : LogoBlack.src}`} // eslint-disable-line
        alt="Logo"
        priority={true}
      />
      <h1 className="text-4xl custom-bold">{stats?.gameId % 13 == 0 ? "WORLDE :)" : "WORDLE"}</h1>
      <div className="mt-2">
        <div className="flex flex-row justify-center">
          <p className="px-2">{`#${stats?.gameId}, ${stats?.date}`}</p>
          <VersionLog />
        </div>
        <p>{`${stats?.timesGuessed === 0 ? "No Dokutahs have" : stats?.timesGuessed + " " + (stats?.timesGuessed && stats.timesGuessed > 1 ? "Dokutahs have" : "Dokutah has")} guessed the operator.`}</p>
        <Countdown date={seconds} autoStart={false} ref={countdownRef} renderer={(props: CountdownRenderProps) => redererProp(props)}/>
      </div>
    </>
  );
}
