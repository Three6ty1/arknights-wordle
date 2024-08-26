import type { Operator } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { getOperatorIconUrl } from "~/helper/helper";
import { GameModeContext } from "~/pages/index";
import { SearchContext } from "./search";

type Props = {
  operator: Operator;
};

export default function Result({ operator }: Props) {
  const [pastGuesses, setPastGuesses] = React.useState<string[]>([]);

  const {guesses, endlessGuesses, isNormalMode, handleSubmit} = React.useContext(GameModeContext)
  const {setResults, setInput} = React.useContext(SearchContext)

  // Past guesses here to make the text of a previously guessed operator blue
  React.useEffect(() => {
    if (isNormalMode) {
      const pastGuesses = guesses.map((guess) => guess.name);
      setPastGuesses(pastGuesses);
    } else {
      const pastGuesses = endlessGuesses.map((guess) => guess.name);
      setPastGuesses(pastGuesses);
    }
  }, [isNormalMode, guesses, endlessGuesses]);

  const url = getOperatorIconUrl(operator.charId, operator.rarity);

  const handleClick = (e: React.MouseEvent) => {
    setResults([]);
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(
      operator,
      () => {
        setInput("")
      },
    );
  };

  return (
    <button
      className="m-1 flex w-full flex-row items-center self-center"
      onClick={(e) => handleClick(e)}
      id={String(operator.id)}
    >
      <div className="flex w-1/2 justify-end pr-5">
        <Image
          src={url}
          alt={`${operator.name} operator icon`}
          width={50}
          height={50}
        />
      </div>
      <div
        className={"flex w-1/2 justify-start text-start text-2xl " + (pastGuesses.includes(operator.name) && "text-higher")}
      >
        {operator.name}
      </div>
    </button>
  );
}
