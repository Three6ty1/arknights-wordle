import React from "react"
import { GameModeContext } from "~/pages/index"
import CategoryRows from "./categoryRow"
import type { GuessResult } from "~/helper/compare"
import AnswerRow from "./answerRow"

export default function PastGuesses() {
  const {isNormalMode, guesses, endlessGuesses} = React.useContext(GameModeContext)

  return (
    <div className="w-full">
      <div className="flex items-center justify-start md:justify-center align-middle pb-10 z-10 mt-3 overflow-x-scroll md:overflow-visible">
        {/** Wrapper for div to expand into scrollable area in mobile */}
        <div className="flex flex-col w-fit">
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
    </div>
  )
}