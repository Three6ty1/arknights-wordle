import React from "react";
import { GameModeContext, ThemeContext } from "~/pages/index";

const endlessIcon = (isNormalMode: boolean) => (
  <svg className={"w-6 h-6 " + (!isNormalMode && "text-white animate-slow-spin")} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
  </svg>
)

export default function EndlessSwitch() {
  // const {isNormalMode, setIsNormalMode, playing} = React.useContext(GameModeContext)
  const {isNormalMode, setIsNormalMode} = React.useContext(GameModeContext)
  const {highContrast} = React.useContext(ThemeContext)
  // const [animate, setAnimate] = React.useState(false)

  const buttonClass = highContrast ? "btn-info" : "btn-success"

  return (
    /*
    <div
    className={`indicator-item tooltip m-2 before:whitespace-pre-wrap ${animate ? "animate-shake" : ""}`}
    data-tip={playing ? "Endless Mode is\nlocked until the\nDaily Game is\nfinished" : "Endless Mode"}
    onClick={() => {if (playing) {setAnimate(true); setTimeout(() =>setAnimate(false), 200);}}}
    >
    </div>
    */
    <button 
      className={"btn indicator-item tooltip flex items-center " + (!isNormalMode ? buttonClass : "")}
      data-tip="Endless Mode"
      // disabled={playing}
      onClick={() => setIsNormalMode(!isNormalMode)}
    >
      {endlessIcon(isNormalMode)}
    </button> 
  )
}