import { Range, Correctness } from "~/helper/helper";
import React from "react";
import { GameModeContext } from "~/pages/index";
import HistoryGraph from "./historyGraph";

type Props = {
  gameId: number;
};

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
          onClick={() => handleOtherShare()}
        >
          On other sites
        </button>
      </div>
      <dialog id="share-modal" className="modal">
      <div className="modal-box">
        <h1 className="font-bold text-xl">Copied to clipboard!</h1>
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
