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
  const color = result ? "correct" : "incorrect";

  return (
    <div
      className={`${divStyle} bg-${color}`}
      style={{
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{guess}</span>
    </div>
  );
}
