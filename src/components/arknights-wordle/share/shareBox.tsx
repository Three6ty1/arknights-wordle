import { Range, Correctness } from "~/helper/helper";
import React from "react";
import { GameModeContext } from "~/pages/index";
import HistoryGraph from "./historyGraph";

type Props = {
  gameId: number;
};

const shareIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
  </svg>
)

export default function ShareBox({ gameId }: Props) {
  const [shareString, setShareString] = React.useState("");

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
  }, [guesses]);

  const handleShare = (newString: string) => {
    navigator.clipboard.writeText(newString).catch(() => {
      console.log("Cannot add to clipboard");
    });
    (document.getElementById('share-modal') as HTMLDialogElement).showModal()
  }

  const handleOtherShare = () => {
    const newString = `Arknights Wordle #${gameId}\nOperator guessed in ` + shareString + "https://ak-wordle.three6ty1.dev/";
    handleShare(newString)
  };

  const handleMarkdownShare = () => {
    const newString = `[Arknights Wordle](<https://ak-wordle.three6ty1.dev/>) #${gameId}\nOperator guessed in ` + shareString;
    handleShare(newString)
  }

  return (
    <div className="flex flex-col items-center justify-center align-middle">
      <div className="flex flex-row items-center justify-evenly space-x-3">
        <button
          className="btn btn-success w-fit text-white"
          onClick={() => handleMarkdownShare()}
        >
          {shareIcon()}
          For Discord
        </button>
        <button
          className="btn btn-success w-fit text-white"
          onClick={() => handleOtherShare()}
        >
          {shareIcon()}
          For other sites
        </button>
      </div>
      <dialog id="share-modal" className="modal">
      <div className="modal-box">
        <h1 className="custom-bold text-xl">Copied to clipboard!</h1>
        <p>Here are your stats. Thanks for playing :)</p>
        <div className="m-3 mb-0">
          <HistoryGraph />
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </div>
  );
}
