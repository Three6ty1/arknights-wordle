import { HintBreakpoints } from "./hints";

export default function HintHelp() {
  return (
    <>
      <button
        className="btn indicator-item tooltip m-2 flex w-1/5 items-center"
        data-tip="Help and Info"
        onClick={() =>
          (
            document.getElementById("help_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
      </button>
      <dialog id="help_modal" className="modal">
        <div className="modal-box h-2/3 md:h-auto">
          <a href="" className="tooltip tooltip-left absolute top-2 right-2 border-current border-2 rounded-md items-center justify-center" data-tip="Report a bug or give feedback" target="_blank">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5 9 4V3m5 2 1-1V3m-3 6v11m0-11a5 5 0 0 1 5 5m-5-5a5 5 0 0 0-5 5m5-5a4.959 4.959 0 0 1 2.973 1H15V8a3 3 0 0 0-6 0v2h.027A4.959 4.959 0 0 1 12 9Zm-5 5H5m2 0v2a5 5 0 0 0 10 0v-2m2.025 0H17m-9.975 4H6a1 1 0 0 0-1 1v2m12-3h1.025a1 1 0 0 1 1 1v2M16 11h1a1 1 0 0 0 1-1V8m-9.975 3H7a1 1 0 0 1-1-1V8"/>
            </svg>
          </a>
          <h1 className="mb-2 text-xl custom-bold">
            How to play Arknights Wordle
          </h1>
          <p>Each operator has 7 categories each.</p>
          <p>
            You must enter an operator and compare its traits to the currently
            chosen operator.
          </p>
          <p>
            <span className="custom-bold">
              After {HintBreakpoints.one} guesses
            </span>{" "}
            the operator list will be sorted by Rarity.
          </p>
          <p>
            <span className="custom-bold">
              After {HintBreakpoints.two} guesses
            </span>{" "}
            the operator list will be sorted by Class.
          </p>
          <p>
            After a guess, the correctness of your guess will be represented by
            these colours:
          </p>
          <ul className="whitespace-pre-line text-center">
            <li>
              <p className="bg-incorrect text-white custom-bold">Grey</p>
              <p>Incorrect.</p>
            </li>
            <li>
              <p className="bg-higher text-white custom-bold">Blue</p>
              <p>
                The E2 cost of the chosen operator is{" "}
                <span className="custom-bold">HIGHER</span>
                <br />
                than your guessed operators E2 cost.
              </p>
            </li>
            <li>
              <p className="bg-lower text-white custom-bold">Red</p>
              <p>
                The E2 cost of the chosen operator is{" "}
                <span className="custom-bold">LOWER</span>
                <br />
                than your guessed operators E2 cost.
              </p>
            </li>
            <li>
              <p className="bg-half text-white custom-bold">Orange</p>
              <p>
                The <span className="custom-bold">allegiance</span> of your
                guessed operator is{" "}
                <span className="custom-bold">partially correct</span>
              </p>
              <p>
                E.g. If the character is under Elite Ops and you guess a
                character from OP Reserve A1, this guess would be partially
                correct because both groups fall under Rhodes Island.
              </p>
            </li>
            <li>
              <p className="bg-correct text-white custom-bold">Green</p>
              <p>Correct.</p>
            </li>
          </ul>
          <br />
          <p>Reset at 12:00AM AEST / 2:00PM UTC / 10AM EST</p>
          <div>Azbuka W01 Condensed font made from <a className="underline text-blue-600" href="http://www.onlinewebfonts.com" target="_blank">Web Fonts</a> is licensed by CC BY 4.0</div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
