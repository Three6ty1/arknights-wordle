import React from "react"
import { GameModeContext, ThemeContext } from "~/pages/index"
import Search from "./search/search"
import ShareBox from "./share/shareBox"

type Props = {
  isInputDelay: boolean,
  playing: boolean,
}

export default function SearchAndShare({isInputDelay, playing} : Props) {

  const {isNormalMode, endlessPlaying, stats, endlessGuesses, handleEndlessReset} = React.useContext(GameModeContext)
  const {highContrast} = React.useContext(ThemeContext)

  const buttonClass = highContrast ? "btn w-fit text-white btn-info" : "btn w-fit text-white btn-success"

  return (
    <div className="z-50 col-start-1 row-start-1 flex h-fit w-full flex-col align-middle">
      {/**
      * Using grid and col-start to force these elements to overlap one another
      * This is so the search bar appears ontop of the answer row instead of pushing it down.
      */}
      {isNormalMode ? 
        <>
          {playing && !isInputDelay && (
            <Search />
          )}
          {!playing && !isInputDelay && (
            <ShareBox gameId={stats.gameId} />
          )}
        </>
        :
        <>
          {endlessPlaying && !isInputDelay && (
            <Search />
          )}
          {!endlessPlaying && !isInputDelay && (
            <div className="flex flex-row w-1/2 self-center items-center space-x-2 justify-center">
              <p>Congratulations! You guessed<br />the operator in {endlessGuesses.length} tries!</p>
              <button className={buttonClass} onClick={() => handleEndlessReset()}>Refresh Endless</button>
            </div>
          )}
        </>
      }
    </div>
  )
}