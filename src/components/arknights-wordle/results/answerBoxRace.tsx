import { raceToolTips, wordleColors } from "~/helper/helper";
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
  const bg = result ? wordleColors.correct : wordleColors.incorrect;

  return (
    <div
      className={`${divStyle} tooltip-answer-row`}
      data-tip={raceToolTips[guess as keyof typeof raceToolTips]}
      style={{
        backgroundColor: bg,
        animationDelay: `${boxIndex * animationDelay}ms`,
      }}
    >
      <span className="whitespace-pre-line">{guess === "Unknown/Undisclosed" ? "Unknown/\nUndisclosed" : guess}</span>
    </div>
  );
}
