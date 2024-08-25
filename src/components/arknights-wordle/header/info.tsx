import LogoBlack from "../../../../public/logo_black.svg";
import LogoWhite from "../../../../public/logo_white.svg";
import Image from "next/image";
import VersionLog from "./versions";
import React from "react";
import { GameModeContext, ThemeContext } from "~/pages";
import NextCountdown from "./nextCountdown";

export default function Info() {
  const { stats } = React.useContext(GameModeContext)
  const { darkMode } = React.useContext(ThemeContext)
  
  return (
    <>
      {/* The preload issue does not go away... Fix later??? */}
      <div className="flex flex-col align-middle items-center justify-center">
        <Image
          width={416}
          height={72}
          src={`${darkMode ? LogoWhite.src : LogoBlack.src}`} // eslint-disable-line
          alt="Logo"
          priority={true}
        />
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
