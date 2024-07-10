import { getOperatorIconUrl } from "~/helper/helper";
import type { GuessResult } from "~/helper/compare";
import Image from "next/image";

type Props = {
  op: GuessResult;
  name: string;
  divStyle: string;
};

export default function AnswerBoxName({ op, name, divStyle }: Props) {
  const url = getOperatorIconUrl(op.charId, op.rarity.guess);

  return (
    <div
      className={`${divStyle} tooltip-answer-row bg-base-200`}
      data-tip={name}
      style={{ animationDelay: "200ms" }}
    >
      <Image width={80} height={80} src={url} alt={`${name} operator icon`} />
    </div>
  );
}
