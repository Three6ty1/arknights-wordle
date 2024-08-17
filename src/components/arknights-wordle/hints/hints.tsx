import React from "react";
import HintHelp from "./hintHelp";
import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";
import EndlessSwitch from "./endlessSwitch";
import Statistics from "./statistics";
import SubmitBug from "./submitBug";
import Theme from "./theme";
import HighContrast from "./highContrast";

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
        <div className="dropdown m-2">
          <div tabIndex={0} role="button" className="btn">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </div>
          <div tabIndex={0} className="dropdown-content dropdown-bottom bg-base-100 rounded-md z-[100] w-fit mt-1 p-1 shadow-sm shadow-neutral-content space-y-1">
            <HintHelp />
            <Statistics />
            <Theme />
            <HighContrast />
            <SubmitBug />
          </div>
        </div>
        <HintOperatorList />
        <HintWorldMap />
        <EndlessSwitch />
      </div>
    </div>
  );
}
