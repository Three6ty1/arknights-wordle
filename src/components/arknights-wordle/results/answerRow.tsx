import type { GuessResult } from "~/helper/compare";
import AnswerBoxBasic from "./answerBoxBasic";
import AnswerBoxName from "./answerBoxName";
import AnswerBoxRace from "./answerBoxRace";
import AnswerBoxCost from "./answerBoxCost";
import type { Correctness, Range } from "~/helper/helper";
import AnswerBoxAllegiance from "./answerBoxAllegiance";
import AnswerBoxRarity from "./answerBoxRarity";
import { GameModeContext } from "~/pages/index";
import React from "react";

export const animationDelay = 225;
type Props = {
  guess: GuessResult;
  index: number;
};

export default function AnswerRow({ guess, index }: Props) {
  // Get the current guess through local storage to persist animation logic

  const {guesses, endlessGuesses, isNormalMode} = React.useContext(GameModeContext)

  let divStyle = "answer-row flex flex-col p-1 leading-5 text-white";

  const op = isNormalMode ? guesses[index] : endlessGuesses[index];
  if (!op) {
    return <>Loading...</>;
  }

  index === 0 &&
    (op.correct
      ? (divStyle += " opacity-0 animate-win ")
      : (divStyle += " opacity-0 animate-flip "));

  return (
    <div className="flex w-auto flex-row justify-center">
      {Object.keys(guess).map((key, boxIndex) => {
        if (key === "charId" || key === "correct") {
          return null;
        } else if (key === "name") {
          return (
            // Need this here to make the tooltip for Answer box name overlap the next category
            <div className="z-10 before:z-10" key={key}>
              <AnswerBoxName
                op={op}
                name={guess[key as keyof typeof guess] as string}
                divStyle={divStyle}
              />
            </div>
          );
        } else if (key === "race") {
          return (
            <AnswerBoxRace
              key={key}
              guess={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: boolean;
                  }
                ).guess
              }
              result={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: boolean;
                  }
                ).result
              }
              boxIndex={boxIndex}
              divStyle={divStyle}
            />
          );
        } else if (key === "cost") {
          return (
            <AnswerBoxCost
              key={key}
              guess={
                (
                  guess[key as keyof typeof guess] as {
                    guess: number[];
                    result: Range;
                  }
                ).guess
              }
              result={
                (
                  guess[key as keyof typeof guess] as {
                    guess: number[];
                    result: Range;
                  }
                ).result
              }
              boxIndex={boxIndex}
              divStyle={divStyle}
            />
          );
        } else if (key === "allegiance") {
          return (
            <AnswerBoxAllegiance
              key={key}
              guess={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: Correctness;
                  }
                ).guess
              }
              result={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: Correctness;
                  }
                ).result
              }
              boxIndex={boxIndex}
              divStyle={divStyle}
            />
          );
        } else if (key === "rarity") {
          return (
            <AnswerBoxRarity
              key={key}
              guess={
                (
                  guess[key as keyof typeof guess] as {
                    guess: number;
                    result: Range;
                  }
                ).guess
              }
              result={
                (
                  guess[key as keyof typeof guess] as {
                    guess: number;
                    result: Range;
                  }
                ).result
              }
              boxIndex={boxIndex}
              divStyle={divStyle}
            />
          );
        } else {
          return (
            <AnswerBoxBasic
              key={key}
              guess={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: boolean;
                  }
                ).guess
              }
              result={
                (
                  guess[key as keyof typeof guess] as {
                    guess: string;
                    result: boolean;
                  }
                ).result
              }
              boxIndex={boxIndex}
              divStyle={divStyle}
            />
          );
        }
      })}
    </div>
  );
}
