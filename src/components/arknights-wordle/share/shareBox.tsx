import { Range, Correctness } from "~/helper/helper";
import React from "react";
import { GameModeContext, SharePreferenceContext, ThemeContext } from "~/pages/index";
import HistoryGraph from "./historyGraph";
import SharePreference from "./sharePreference";
import NextCountdown from "../header/nextCountdown";

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

  const {guesses, playing} = React.useContext(GameModeContext)
  const {highContrast} = React.useContext(ThemeContext)
  const {sharePreference } = React.useContext(SharePreferenceContext)

  React.useEffect(() => {
    const generateshareString = () => {
      let newString = ""
      const discord = sharePreference.platform === "discord"

      for (const guess of guesses.slice().reverse()) {
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

        // Normalising the length of guesses.
        if (sharePreference.platform !== "other" && sharePreference.guesses && !guess.correct) {
          let name = guess.name
          let normLength = name.length
          newString += discord ? ` ||` : ` >!`

          if (normLength >= 15) {
            name = name.slice(0, 10) + "..."
            normLength = 12
          }

          newString += name
          for (let i = normLength; i <= 15; i++) {
            newString += discord ? `  ` : `_`
          }

          newString += discord ? `||` : `!<  `
        }
        
        newString += discord ? "\n" : "  \n";
      }

      setShareString(newString);
    };

    generateshareString();
  }, [playing, sharePreference]);

  const handleClipboard = (newString: string) => {
    navigator.clipboard.writeText(newString).catch(() => {
      console.log("Cannot add to clipboard");
    });
    (document.getElementById('share-modal') as HTMLDialogElement).showModal()

    console.log(newString)
  }

  const handleShare = () => {
    let newString = ""
    const amtGuesses = guesses.length
    if (sharePreference.platform === "discord") {
      if (sharePreference.hyperlink) {
        newString = `[Arknights Wordle](<https://ak-wordle.three6ty1.dev/>) #${gameId}\nOperator guessed in ${amtGuesses}\n` + shareString;
      } else {
        newString = `Arknights Wordle #${gameId}\nOperator guessed in ${amtGuesses}\n` + shareString + "<https://ak-wordle.three6ty1.dev/>";
      }
    } else if (sharePreference.platform === "reddit") {
      if (sharePreference.hyperlink) {
        newString = `[Arknights Wordle](<https://ak-wordle.three6ty1.dev/>) #${gameId}  \nOperator guessed in ${amtGuesses}  \n` + shareString;
      } else {
        newString = `Arknights Wordle #${gameId}  \nOperator guessed in ${amtGuesses}  \n` + shareString + "<https://ak-wordle.three6ty1.dev/>";
      }
    } else {
        newString = `Arknights Wordle #${gameId}\nOperator guessed in ${amtGuesses}\n` + shareString + "https://ak-wordle.three6ty1.dev/";
    }
    
    handleClipboard(newString)
  }

  return (
    <>
      <div className="flex flex-col justify-center space-y-2 items-center">
        <NextCountdown />
        <button className={`${highContrast ? "btn-info" : "btn-success"} custom-bold btn text-white w-fit`} onClick={() => {(document.getElementById("share-modal") as HTMLDialogElement).showModal(); handleShare()}}>
            {shareIcon()}
            Share
        </button>
      </div>
      <dialog id="share-modal" className="modal">
        <div className="modal-box">
          <h1 className="custom-bold text-xl mb-4">Copied to clipboard!</h1>
          <SharePreference handleShare={() => handleShare()} />
          <p className="mt-4">Here are your stats. Thanks for playing :)</p>
          <div className="mx-3 mb-0">
            <HistoryGraph />
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
