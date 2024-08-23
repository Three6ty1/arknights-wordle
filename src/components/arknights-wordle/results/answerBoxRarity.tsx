import { Range } from "~/helper/helper";
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
  let color = "correct";
  if (result === Range.Lower) {
    color = "lower";
  } else if (result === Range.Higher) {
    color = "higher";
  }

  return (
    <div
      className={`${divStyle} bg-${color}`}
      style={{
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{guess}</span>
      <span>{result}</span>
    </div>
  );
}
