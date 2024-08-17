import { Correctness } from "~/helper/helper";
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
  let color = "correct";
  if (result === Correctness.Half) {
    color = "half";
    tooltip = true;
  } else if (result === Correctness.Wrong) {
    color = "incorrect";
  }

  // Students of Ursus edge case
  if (guess.split(" ").length > 3) {
    divStyle += " leading-[1rem] text-sm "
  }

  return (
    <>
      {tooltip ? (
        <div
          className={`${divStyle} tooltip-answer-row bg-${color}`}
          data-tip={allegianceTooltip}
          style={{
            animationDelay: `${boxIndex * animationDelay}ms`,
          }}
        >
          <span>{guess}</span>
        </div>
      ) : (
        <div
          className={`${divStyle} bg-${color}`}
          style={{
            animationDelay: `${boxIndex * animationDelay}ms`,
          }}
        >
          <span>{guess}</span>
        </div>
      )}
    </>
  );
}
