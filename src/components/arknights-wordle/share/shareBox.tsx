import { Range, Correctness } from "~/helper/helper";
import React from "react";
import { GameModeContext } from "~/pages/index";

type Props = {
  gameId: number;
};

export default function ShareBox({ gameId }: Props) {
  const [shareString, setShareString] = React.useState("");
  const [isVisible, setIsVisible] = React.useState(false);

  const {guesses} = React.useContext(GameModeContext)

  React.useEffect(() => {
    const generateshareString = () => {
      let newString = String(guesses.length);
      guesses.length > 1 ? newString += " tries." : newString += " try!";
      newString += "\n";

      for (const guess of guesses.reverse()) {
        for (const category in guess) {
          if (
            category === "charId" ||
            category === "name" ||
            category === "correct"
          ) {
            continue;
          }

          const compare = guess[category as keyof typeof guess] as {
            guess: unknown;
            result: unknown;
          };

          // Correctness and Range .corret's are the same, just added for clarity
          if (
            compare.result === Range.Correct ||
            compare.result === Correctness.Correct ||
            compare.result === true
          ) {
            newString += "🟩";
          } else if (
            compare.result === false ||
            compare.result === Correctness.Wrong
          ) {
            newString += "🟥";
          } else if (compare.result === Range.Lower) {
            newString += "⬇️";
          } else if (compare.result === Range.Higher) {
            newString += "⬆️";
          } else if (compare.result === Correctness.Half) {
            newString += "🟨";
          }
        }
        newString += "\n";
      }

      setShareString(newString);
    };

    generateshareString();
  });

  const handleShare = () => {
    const newString = `Arknights Wordle #${gameId}\nOperator guessed in ` + shareString + "https://three6ty1.vercel.app/arknights-wordle";
    navigator.clipboard.writeText(newString).catch(() => {
      console.log("Cannot add to clipboard");
    });
    if (isVisible) {
      return;
    }
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  };

  const handleMarkdownShare = () => {
    const newString = `[Arknights Wordle](<https://three6ty1.vercel.app/arknights-wordle>) #${gameId}\nOperator guessed in ` + shareString;
    navigator.clipboard.writeText(newString).catch(() => {
      console.log("Cannot add to clipboard");
    });
    if (isVisible) {
      return;
    }
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 3000);
  }

  return (
    <div className="flex flex-col items-center justify-center pb-10 align-middle">
      <h1 className="text-main font-bold">Share your results!</h1>
      <div className="flex flex-row items-center justify-evenly space-x-3">
        <button
          className="btn btn-success w-fit text-white"
          onClick={() => handleMarkdownShare()}
        >
          With Markdown (Discord)
        </button>
        <button
          className="btn btn-success w-fit text-white"
          onClick={() => handleShare()}
        >
          On other sites
        </button>
      </div>
      {isVisible && (
        <div className="toast toast-start md:toast-end text-center z-[999]">
          <div className="flex alert alert-success text-center">
            <span>Copied to clipboard.</span>
          </div>
        </div>
      )}
    </div>
  );
}
