import { guessCategoryToolTips } from "~/helper/helper";

export default function CategoryRows() {
  return (
    <div className="flex flex-row justify-center break-all font-bold">
      {Object.entries(guessCategoryToolTips).map((category, index) => (
        <span
          key={index}
          className="tooltip-answer-row answer-row text-content flex whitespace-pre-line bg-base-200"
          data-tip={category[1]}
        >
          {category[0]}
        </span>
      ))}
    </div>
  );
}
