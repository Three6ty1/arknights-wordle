import React from "react"
import { GameModeContext } from "~/pages/index"
import CategoryRows from "./categoryRow"
import type { GuessResult } from "~/helper/compare"
import AnswerRow from "./answerRow"

export default function PastGuesses() {
  const {isNormalMode, guesses, endlessGuesses} = React.useContext(GameModeContext)

  return (
    <>
      {/** Needs margin top or else it overlaps with search bar due to the grid formatting. */}
      <div className="relative top-20 col-start-1 row-start-1 flex flex-col overflow-y-clip overflow-x-scroll pb-10 md:overflow-x-visible md:overflow-y-visible">
        {/** Wrapper for div to expand into scrollable area in mobile */}
        <div className="flex w-fit flex-col">
          {isNormalMode ? 
            <>
              {guesses && guesses.length > 0 && (
                <>
                  <CategoryRows />
                  {guesses.map((guess: GuessResult, index) => (
                    <AnswerRow
                      key={guess.charId ? guess.charId : index}
                      guess={guess}
                      index={index}
                    />
                  ))}
                </>
              )}
            </>
            :
            <>
              {endlessGuesses && endlessGuesses.length > 0 && (
                <>
                  <CategoryRows />
                  {endlessGuesses.map((guess: GuessResult, index) => (
                    <AnswerRow
                      key={guess.charId ? guess.charId : index}
                      guess={guess}
                      index={index}
                    />
                  ))}
                </>
              )}
            </>
          }
        </div>
      </div>
    </>
  )
}