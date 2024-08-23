import { Range, Correctness } from "~/helper/helper";
import React from "react";
import { GameModeContext, SharePreferenceContext, ThemeContext } from "~/pages/index";
import HistoryGraph from "./historyGraph";

type Props = {
  gameId: number;
};

const shareIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
  </svg>
)

const switchIcon = () => (
  <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
  </svg>
)

export default function ShareBox({ gameId }: Props) {
  const [shareString, setShareString] = React.useState("");

  const {guesses} = React.useContext(GameModeContext)
  const {highContrast} = React.useContext(ThemeContext)
  const {sharePreference, handleSharePreferenceUpdate} = React.useContext(SharePreferenceContext)

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
  }, [guesses, sharePreference]);

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

  const inputStyle = "custom-bold border-2 p-2 h-fit " + (highContrast ? "border-info hover:border-info focus:border-info" : "border-success hover:border-success focus:border-success")

  return (
    <div className="flex flex-row justify-center space-x-2">
      <button className={`${highContrast ? "btn-info" : "btn-success"} custom-bold btn text-white w-fit`} onClick={() => {(document.getElementById("share-modal") as HTMLDialogElement).showModal(); handleShare()}}>
          {shareIcon()}
          Share
      </button>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn custom-bold">
          <svg  className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
          </svg>
          <span>Edit format</span>
        </div>
        <div tabIndex={0} className="flex flex-col dropdown-content w-[220px] z-[100] mt-1 p-3 space-y-2 bg-base-100 shadow-sm shadow-neutral-content rounded-md ">
          <div className="text-nowrap flex flex-row flex-nowrap justify-start items-center space-x-2">
            <span>Share on</span>
            <select id="share-preference-select" className={`select select-ghost focus:outline-none w-[200px] ${inputStyle}`} value={sharePreference.platform} onChange={(e) => handleSharePreferenceUpdate("platform", e.target.value)}>
              <option value="other" className="text-base">Other platforms</option>
              <option value="discord" className="text-base">Discord</option>
              <option value="reddit" className="text-base">Reddit</option>
            </select>
          </div>

          {sharePreference.platform !== "other" &&
            <>
              <div className="text-nowrap flex flex-row justify-start items-center space-x-2">
                <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} onClick={() => handleSharePreferenceUpdate("guesses")}>
                  <span>{sharePreference.guesses ? "with" : "without"}</span>
                  {switchIcon()}
                </button>
                <span>the guesses and</span>
              </div>
              <div className="text-nowrap flex flex-row justify-start items-center space-x-2">
                <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} onClick={() => handleSharePreferenceUpdate("hyperlink")}>
                  <span>{sharePreference.hyperlink ? "with" : "without"}</span>
                  {switchIcon()}
                </button>
                <span>the hyperlink</span>
              </div>
            </>
          }
        </div>
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
