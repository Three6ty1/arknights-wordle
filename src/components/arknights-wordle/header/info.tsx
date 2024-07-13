import LogoBlack from "../../../../public/logo_black.svg";
import LogoWhite from "../../../../public/logo_white.svg";
import Image from "next/image";
import VersionLog from "./versions";
import React from "react";
import { GameModeContext, ThemeContext } from "~/pages";

export default function Info() {
  const { stats } = React.useContext(GameModeContext)
  const { darkMode } = React.useContext(ThemeContext)
  
  return (
    <>
      {/* The preload issue does not go away... Fix later??? */}
      <Image
        width={416}
        height={72}
        src={`${darkMode ? LogoWhite.src : LogoBlack.src}`}
        alt="Logo"
        priority={true}
      />
      <h1 className="text-4xl font-bold">{stats?.gameId % 13 == 0 ? "WORLDE :)" : "WORDLE"}</h1>
      <div className="mt-2">
        <div className="flex flex-row justify-center">
          <p className="px-2">{`#${stats?.gameId}, ${stats?.date}`}</p>
          <VersionLog />
        </div>
        
        <p>{`${stats?.timesGuessed === 0 ? "No Dokutahs have" : stats?.timesGuessed + " " + (stats?.timesGuessed && stats.timesGuessed > 1 ? "Dokutahs have" : "Dokutah has")} guessed the operator.`}</p>
      </div>
    </>
  );
}
