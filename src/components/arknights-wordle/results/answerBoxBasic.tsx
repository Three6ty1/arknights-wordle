import { wordleColors } from "~/helper/helper";
import { animationDelay } from "./answerRow";

type Props = {
  guess: string;
  result: boolean;
  boxIndex: number;
  divStyle: string;
};

export default function AnswerBoxBasic({
  guess,
  result,
  boxIndex,
  divStyle,
}: Props) {
  const bg = result ? wordleColors.correct : wordleColors.incorrect;

  return (
    <div
      className={`${divStyle}`}
      style={{
        backgroundColor: bg,
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{guess}</span>
    </div>
  );
}
