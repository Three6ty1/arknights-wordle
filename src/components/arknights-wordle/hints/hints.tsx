import React from "react";
import HintHelp from "./hintHelp";
import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";
import EndlessSwitch from "./endlessSwitch";

export enum HintBreakpoints {
  "one" = 5,
  "two" = 8,
}

export default function Hints() {
  // breakpoint one = 5
  //      operator list split into rarity
  //      - Region cheatsheet - REMOVED
  // breakpoint two = 8
  //      operator list sorted by class and rarity

  return (
    <div className="my-2 flex w-full justify-center align-middle md:w-96">
      <div className="flex w-3/4 flex-row justify-center">
        <HintOperatorList />
        <HintHelp />
        <HintWorldMap />
        <EndlessSwitch />
      </div>
    </div>
  );
}
