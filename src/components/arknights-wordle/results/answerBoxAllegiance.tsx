import { Correctness, wordleColors } from "~/helper/helper";
import { animationDelay } from "./answerRow";

type Props = {
  guess: string;
  result: Correctness;
  boxIndex: number;
  divStyle: string;
};

export default function AnswerBoxAllegiance({
  guess,
  result,
  boxIndex,
  divStyle,
}: Props) {
  const allegianceTooltip = "Correct Allegiance but wrong subdivision";

  let tooltip = false;
  let bg = wordleColors.correct;
  if (result === Correctness.Half) {
    bg = wordleColors.half;
    tooltip = true;
  } else if (result === Correctness.Wrong) {
    bg = wordleColors.incorrect;
  }

  // Students of Ursus edge case
  if (guess.split(" ").length > 3) {
    divStyle += " text-xs"
  }

  return (
    <>
      {tooltip ? (
        <div
          className={`${divStyle} tooltip-answer-row`}
          data-tip={allegianceTooltip}
          style={{
            backgroundColor: bg,
            animationDelay: `${boxIndex * animationDelay}ms`,
          }}
        >
          <span>{guess}</span>
        </div>
      ) : (
        <div
          className={`${divStyle}`}
          style={{
            backgroundColor: bg,
            animationDelay: `${boxIndex * animationDelay}ms`,
          }}
        >
          <span>{guess}</span>
        </div>
      )}
    </>
  );
}
