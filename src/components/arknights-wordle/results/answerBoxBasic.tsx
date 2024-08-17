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
  
  return (
    <div
      className={`${divStyle} ` + result ? "bg-correct" : "bg-incorrect"}
      style={{
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span>{guess}</span>
    </div>
  );
}
