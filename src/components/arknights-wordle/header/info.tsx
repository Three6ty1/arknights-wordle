import VersionLog from "./versions";
import React from "react";
import { GameModeContext} from "~/pages";
import NextCountdown from "./nextCountdown";
import LogoBlack from "./logo";

export default function Info() {
  const { stats } = React.useContext(GameModeContext)
  
  return (
    <>
      {/* The preload issue does not go away... Fix later??? */}
      <div className="flex flex-col align-middle items-center justify-center">
        <LogoBlack />
        <h1 className="text-4xl custom-bold">{stats?.gameId % 13 == 0 ? "WORLDE :)" : "WORDLE"}</h1>
      </div>
      <div className="mt-1">
        <div className="flex flex-row justify-center">
          <p className="px-2">{`#${stats?.gameId}, ${stats?.date}`}</p>
          <VersionLog />
        </div>
        <p>{`${stats?.timesGuessed === 0 ? "No Dokutahs have" : stats?.timesGuessed + " " + (stats?.timesGuessed && stats.timesGuessed > 1 ? "Dokutahs have" : "Dokutah has")} guessed the operator.`}</p>
        <NextCountdown />
      </div>
    </>
  );
}
