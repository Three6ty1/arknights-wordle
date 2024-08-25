import { guessCategoryToolTips } from "~/helper/helper";

export default function CategoryRows() {
  return (
    <div className="flex flex-row justify-center break-all">
      {Object.entries(guessCategoryToolTips).map((category, index) => (
        <div className={" tooltip " + (index === 7 ? "tooltip-left md:tooltip-bottom" : "tooltip-bottom")} key={index} data-tip={category[1]}>
          <span className={"answer-row text-content flex whitespace-pre-line bg-base-200 custom-bold"}>
            {category[0]}
          </span>
        </div>
      ))}
    </div>
  );
}
