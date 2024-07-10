import type { Stats } from "~/server/api/routers/wordle";
import LogoBlack from "../../../../public/logo_black.svg";
import LogoWhite from "../../../../public/logo_white.svg";
import Image from "next/image";
import VersionLog from "./versions";

type Props = {
  darkMode: boolean;
  stats: Stats;
};
export default function Info({ darkMode, stats }: Props) {
  return (
    <>
      <Image
        width={416}
        height={72}
        src={`${darkMode ? LogoWhite.src : LogoBlack.src}`} // eslint-disable-line
        alt="Logo"
        priority={true}
      />
      <h1 className="text-4xl font-bold">{stats?.gameId % 13 == 0 ? "WORLDE :)" : "WORDLE"}</h1>
      <div className="mt-2">
        <div className="flex flex-row justify-center">
          <p className="px-2">{`#${stats?.gameId}, ${stats?.date}`}</p>
          <VersionLog />
        </div>
        
        <p>{`${stats?.timesGuessed === 0 ? "No Dokutah's have" : stats?.timesGuessed + " " + (stats?.timesGuessed && stats.timesGuessed > 1 ? "Dokutah's have" : "Dokutah has")} guessed the operator.`}</p>
      </div>
    </>
  );
}
