import { raceToolTips } from "~/helper/helper";
import { animationDelay } from "./answerRow";

type Props = {
  guess: string;
  result: boolean;
  boxIndex: number;
  divStyle: string;
};

export default function AnswerBoxRace({
  guess,
  result,
  boxIndex,
  divStyle,
}: Props) {
  const color = result ? "correct" : "incorrect";

  return (
    <div
      className={`${divStyle} tooltip-answer-row bg-${color}`}
      data-tip={raceToolTips[guess as keyof typeof raceToolTips]}
      style={{
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span className="whitespace-pre-line">{guess === "Unknown/Undisclosed" ? "Unknown/\nUndisclosed" : guess}</span>
    </div>
  );
}
