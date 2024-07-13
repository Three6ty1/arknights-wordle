import React from "react"
import { GameModeContext } from "~/pages/index"
import Search from "./search/search"
import ShareBox from "./share/shareBox"

type Props = {
  isInputDelay: boolean,
  playing: boolean,
}

export default function SearchAndShare({isInputDelay, playing} : Props) {

  const {isNormalMode, endlessPlaying, stats, endlessGuesses, handleEndlessReset} = React.useContext(GameModeContext)

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
            <div className="flex flex-col w-1/2 self-center items-center">
              <p>Congratulations! You guessed the operator in {endlessGuesses.length} tries!</p>
              <button className="btn btn-success text-white w-fit" onClick={() => handleEndlessReset()}>Refresh Endless</button>
            </div>
          )}
        </>
      }
    </div>
  )
}