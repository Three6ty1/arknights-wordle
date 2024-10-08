import HintListIcon from "./hintListIcon";
import React from "react";
import { getProfessionIconUrl } from "~/helper/helper";
import { HintBreakpoints } from "./hints";
import Image from "next/image";
import type { Operator } from "@prisma/client";
import { GameModeContext, ThemeContext } from "~/pages/index";

const Professsions = [
  "Vanguard",
  "Guard",
  "Defender",
  "Sniper",
  "Caster",
  "Medic",
  "Supporter",
  "Specialist",
];

const operatorListIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
  </svg>
)

export default function HintOperatorList() {

  const {allOperators, guesses, isNormalMode, endlessGuesses} = React.useContext(GameModeContext)
  const {highContrast, darkMode} = React.useContext(ThemeContext)

  const amtGuesses = isNormalMode ? guesses.length : endlessGuesses.length

  const [showAlert, setShowAlert] = React.useState(false);
  const [selectedProfession, setSelectedProfession] =
    React.useState<string>("");

  React.useEffect(() => {
    const initAlerts = () => {
      if (
        amtGuesses == HintBreakpoints.one.valueOf() ||
        amtGuesses == HintBreakpoints.two.valueOf()
      ) {
        setShowAlert(true);
      }
    };
    initAlerts();
  }, [amtGuesses]);

  const sortedRarityOperators: Record<string, Operator[]> = {
    "6": [],
    "5": [],
    "4": [],
    "3": [],
    "2": [],
    "1": [],
  };

  if (!allOperators) {
    return <>Loading...</>;
  }

  // Sort all operators into sortedRarityOperators
  allOperators.map((operator) =>
    sortedRarityOperators[operator.rarity]!.push(operator),
  );

  const handleProfession = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
  ) => {
    const id = (e.target as HTMLImageElement).id;
    selectedProfession === id
      ? setSelectedProfession("")
      : setSelectedProfession(id);
  };

  const handleClick = () => {
    (
      document.getElementById("operator_list_modal") as HTMLDialogElement
    ).showModal();
    setShowAlert(false);
  };

  return (
    <>
      <div className="indicator">
        {showAlert && <span className="badge indicator-item bg-higher" />}
        <button
          className={`btn tooltip flex w-full items-center ${!isNormalMode && (highContrast ? "btn-info text-white" : "btn-success text-white")}`}
          data-tip={(!isNormalMode ? "'Endless' " : "") + "Operator List"}
          onClick={() => handleClick()}
        >
          {operatorListIcon()}
        </button>
      </div>
      <dialog id="operator_list_modal" className="modal">
        <div className="no-scrollbar no-scrollbar::-webkit-scrollbar modal-box flex h-4/5 max-w-[3/5vh] flex-col justify-items-center overflow-x-clip overflow-y-scroll">
          <h1 className="mb-2 w-full text-xl custom-bold">
            {!isNormalMode ? "'Endless' " : ""}Operator List (Up to Shu)
          </h1>
          <div className="flex w-full flex-row flex-wrap justify-center">
            {/**
             * If under breakpoint 1
             *      List all operators in alphabetical
             * Else
             *      If over breakpoint 2
             *          Display the operator class filters
             *          Filter operators depending on class selected
             *      Else
             *          List all operators sorted in rarity
             */}
            {amtGuesses < HintBreakpoints.one.valueOf() ?
              <>
                {allOperators.map((operator) => (<HintListIcon key={`${operator.name} list icon`} operator={operator} />))}
              </>
            : 
              <>
                {amtGuesses >= HintBreakpoints.two.valueOf() &&
                  <div className="flex flex-row flex-wrap justify-center mb-2">
                    {Professsions.map((p) => (
                      <button className={`tooltip p-[0.2rem] bg-${selectedProfession === p ? "higher" : "white"}`} data-tip={p} key={`${p} icon`}>
                        <Image
                          src={getProfessionIconUrl(p)}
                          style={{filter: darkMode ? "invert(97%)" : ""}}
                          width={45}
                          height={45}
                          id={p}
                          onClick={(e) => handleProfession(e)}
                          alt={`${p} operator icon image`}
                        />
                      </button>
                    ))}
                  </div>
                }
                {Object.entries(sortedRarityOperators)
                  .reverse()
                  .map((rarity) => (
                    <div key={`${rarity[0]} rarity operators`} className="w-full">
                      <h2 className="custom-bold text-lg">{rarity[0]} star Operators</h2>
                      <div className="flex flex-row flex-wrap justify-center">
                        {rarity[1].map((operator) => {
                          if (amtGuesses >= HintBreakpoints.two.valueOf()) {
                            if (selectedProfession === "" || operator.profession === selectedProfession) {
                              return <HintListIcon key={`${operator.name} list icon`} operator={operator} />
                            }
                            return null;
                          }
                          return <HintListIcon key={`${operator.name} list icon`} operator={operator} />
                        })}
                      </div>
                    </div>
                ))}
              </>
            }
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
