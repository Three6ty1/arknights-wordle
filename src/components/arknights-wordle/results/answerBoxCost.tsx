import { wordleColors, Range, costToolTips } from "~/helper/helper";

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
  let bg = wordleColors.correct;
  if (result === Range.Lower) {
    bg = wordleColors.lower;
  } else if (result === Range.Higher) {
    bg = wordleColors.higher;
  }

  return (
    <div
      className={`${divStyle} tooltip-answer-row-cost`}
      data-tip={costToolTips[result as keyof typeof costToolTips]}
      style={{
        backgroundColor: bg,
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{`E0: ${guess[0]}`}</span>
      <span className="custom-bold">{`E2: ${guess[1]}`}</span>
      <span>{result}</span>
    </div>
  );
}
