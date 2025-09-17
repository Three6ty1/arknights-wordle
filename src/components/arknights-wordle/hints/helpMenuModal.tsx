import { HintBreakpoints } from "./hints";

export default function HelpMenuModal() {
  return (
    <dialog id="help_modal" className="modal shadow-lg bg-transparent">
      <div className="modal-box h-2/3 md:h-auto">
        <h1 className="mb-2 text-xl custom-bold">How to play Arknights Wordle</h1>
        <p>Each operator has 7 categories each.</p>
        <p>You must enter an operator and compare its traits to the currently chosen operator.</p>
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
  )
}