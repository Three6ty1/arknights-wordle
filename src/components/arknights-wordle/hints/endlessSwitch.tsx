import React from "react";
import { GameModeContext, ThemeContext } from "~/pages/index";

const endlessIcon = (isNormalMode: boolean) => (
  <svg className={`w-6 h-6 ${!isNormalMode && "text-white animate-slow-spin"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
  </svg>
)

const revealIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m8 7.5 2.5 2.5M19 4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
  </svg>
)

export default function EndlessSwitch() {
  // const {isNormalMode, setIsNormalMode, playing} = React.useContext(GameModeContext)
  const {isNormalMode, setIsNormalMode, endlessGameModeContext} = React.useContext(GameModeContext)
  const {endlessPlaying, handleEndlessRevealAnswer} = endlessGameModeContext;
  const {highContrast} = React.useContext(ThemeContext)
  // const [animate, setAnimate] = React.useState(false)

  const buttonClass = highContrast ? "btn-info" : "btn-success"

  return (
    <div className="flex flex-row">
      <button 
        className={`btn tooltip flex items-center mx-1 ${!isNormalMode ? buttonClass : ""}`}
        data-tip="Endless Mode"
        // disabled={playing}
        onClick={() => setIsNormalMode(!isNormalMode)}
      >
        {endlessIcon(isNormalMode)}
      </button> 

      {!isNormalMode && endlessPlaying &&
        <button
          className={`btn tooltip flex items-center mx-1`}
          data-tip="Reveal the answer"
          onClick={() => handleEndlessRevealAnswer()}
        >
          {revealIcon()}
        </button>
      }
    </div>
  )
}