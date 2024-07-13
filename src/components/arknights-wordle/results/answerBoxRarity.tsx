import { wordleColors, Range } from "~/helper/helper";
import { animationDelay } from "./answerRow";

type Props = {
  guess: number;
  result: Range;
  boxIndex: number;
  divStyle: string;
};

export default function AnswerBoxRarity({
  guess,
  result,
  boxIndex,
  divStyle,
}: Props) {
  let bg = wordleColors.correct;
  if (result === Range.Lower) {
    bg = wordleColors.lower;
  } else if (result === Range.Higher) {
    bg = wordleColors.higher;
  }

  return (
    <div
      className={`${divStyle}`}
      style={{
        backgroundColor: bg,
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{guess}</span>
      <span>{result}</span>
    </div>
  );
}
