import { getOperatorIconUrl } from "~/helper/helper";
import Image from "next/image";
import type { Operator } from "@prisma/client";
type Props = {
  operator: Operator;
};

export default function HintListIcon({ operator }: Props) {
  const url = getOperatorIconUrl(operator.charId, operator.rarity);
  return (
    <div className="tooltip" data-tip={operator.name}>
      <Image
        className={"m-[1px] sm:m-[5px] border-[1px] sm:border-base-content/50"}
        src={url}
        alt={`${operator.name} operator icon`}
        width={55}
        height={55}
      />
    </div>
  );
}
