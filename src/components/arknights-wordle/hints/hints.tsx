import React from "react";
import HelpMenu from "./helpMenu";
import HintOperatorList from "./hintOperatorList";
import HintWorldMap from "./hintWorldMap";
import EndlessSwitch from "./endlessSwitch";
import Statistics from "./statistics";
import SubmitBug from "./submitBug";
import Theme from "./theme";
import HighContrast from "./highContrast";
import HelpMenuModal from "./helpMenuModal";
import StatisticsModal from "./statisticsModal";

export enum HintBreakpoints {
  "one" = 4,
  "two" = 6,
}

export default function Hints() {
  // breakpoint one = 5
  //      operator list split into rarity
  //      - Region cheatsheet - REMOVED
  // breakpoint two = 8
  //      operator list sorted by class and rarity

  return (
    <div className="flex w-full justify-center align-middle md:w-96 mt-3">
      {/** Can't have space-x because it will move not only the buttons but the dialog modal */}
      <div className="flex md:w-3/4 flex-row justify-center">
        <div className="dropdown mx-1">
          <div tabIndex={0} role="button" className="btn">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
          </div>
          <div tabIndex={0} className="dropdown-content bg-base-100 rounded-md z-[100] w-fit mt-1 p-1 shadow-sm shadow-neutral-content space-y-1">
            <HelpMenu />
            <Statistics />
            <Theme />
            <HighContrast />
            <SubmitBug />
          </div>
        </div>
        {/**If we place modals within the dropdown, the drop down disappearing will cause the modal element to also disappear */}
        <HelpMenuModal />
        <StatisticsModal />

        <HintOperatorList />
        <HintWorldMap />
        <EndlessSwitch />
      </div>
    </div>
  );
}
