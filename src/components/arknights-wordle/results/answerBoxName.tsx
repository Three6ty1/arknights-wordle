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
    <>
      <div
        className={`answer-row flex flex-col p-1 leading-5 text-white bg-transparent absolute animate-appear sm:hidden`}
        style={{ animationDelay: "200ms" }}
      >
        <Image width={80} height={80} src={url} alt={`${name} operator icon`} />
      </div>
      <div
        className={`${divStyle} tooltip-answer-row-name bg-base-200`}
        data-tip={name}
        style={{ animationDelay: "200ms" }}
      >
        <Image width={80} height={80} src={url} alt={`${name} operator icon`} />
      </div>
    </>
  );
}
