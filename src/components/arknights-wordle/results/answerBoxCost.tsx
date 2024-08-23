import { Range, costToolTips } from "~/helper/helper";

type Props = {
  guess: number[];
  result: Range;
  boxIndex: number;
  divStyle: string;
};

const animationDelay = 225;

export default function AnswerBoxCost({
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

  // Guess[0] == E0, Guess[1] == E2

  return (
    <div
      className={`${divStyle} tooltip-answer-row-cost bg-${color}`}
      data-tip={costToolTips[result as keyof typeof costToolTips]}
      style={{
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>E0: {guess[0]}</span>
      <span className="custom-bold">E2: {guess[1]}</span>
      <span>{result}</span>
    </div>
  );
}
