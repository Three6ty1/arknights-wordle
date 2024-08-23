import React from "react";

// Types
import { type GuessResult, compareGuess } from "~/helper/compare";
import type { Stats } from "~/server/api/routers/wordle";
import type { Operator } from "@prisma/client";
import type { GetServerSideProps } from "next";

// Components
import Info from "~/components/arknights-wordle/header/info";
import Hints from "~/components/arknights-wordle/hints/hints";
import { getAllOperators, getStats } from "~/server/api/routers/wordle";
import { getDateString, randomInteger } from "~/helper/helper";
import { api } from "~/utils/api";
import Head from "next/head";
import PastGuesses from "~/components/arknights-wordle/results/pastGuesses";
import SearchAndShare from "~/components/arknights-wordle/searchAndShare";
import SearchError from "~/components/arknights-wordle/search/searchError";

interface GameModeContextValue {
  playing: boolean,
  allOperators: Operator[],
  stats: Stats,
  guesses: GuessResult[],
  endlessGuesses: GuessResult[],
  endlessPlaying: boolean,
  isNormalMode: boolean,
  setIsNormalMode: (v: boolean) => void,
  handleSubmit: (guess: Operator, callback: (success: boolean) => void) => void, 
  endlessOp: Operator,
  handleEndlessReset: () => void,
}

interface PlayHistoryContextValue {
  playHistory: Record<string, number>,
}

interface ThemeContextValue {
  handleThemeChange: (e: HTMLInputElement) => void,
  darkMode: boolean,
  handleContrastChange: (e: HTMLInputElement) => void,
  highContrast: boolean,
}

interface SharePreferenceContext {
  sharePreference: Record<string, boolean>,
  handleSharePreferenceUpdate: (s: string) => void,
}

export const GameModeContext = React.createContext(undefined as unknown as GameModeContextValue);
export const PlayHistoryContext = React.createContext<PlayHistoryContextValue>({playHistory: {}});
export const ThemeContext = React.createContext(undefined as unknown as ThemeContextValue);

export const SharePreferenceContext = React.createContext(undefined as unknown as SharePreferenceContext);

export default function ArknightsWordle({
  stats,
  allOperators,
}: {
  stats: Stats;
  allOperators: Operator[];
}) {
  const [guesses, setGuesses] = React.useState<GuessResult[]>([]);
  const [playing, setPlaying] = React.useState(true);

  const [endlessGuesses, setEndlessGuesses] = React.useState<GuessResult[]>([]);
  const [endlessPlaying, setEndlessPlaying] = React.useState(true);
  const [isNormalMode, setIsNormalMode] = React.useState(true);
  const [endlessOp, setEndlessOp] = React.useState<Operator>(undefined as unknown as Operator)

  const [isInputDelay, setIsInputDelay] = React.useState(false);

  const [darkMode, setDarkMode] = React.useState(false);
  const [highContrast, setHighContrast] = React.useState(false);

  const [error, setError] = React.useState("");
  const [endlessError, setEndlessError] = React.useState("");

  const [playHistory, setPlayHistory] = React.useState<Record<string, number>>({});

  const winMutation = api.wordle.updateWins.useMutation();

  const [sharePreference, setSharePreference] = React.useState<Record<string, boolean>>({})

  React.useEffect(() => {
    const initGuesses = () => {
      const now = getDateString();
      const lastPlayed = localStorage.getItem("lastPlayed");
      // Refresh the guesses and set playing to true if the last played date is not the current date
      if (now != lastPlayed) {
        localStorage.setItem("guesses", JSON.stringify([]));
        localStorage.setItem("lastPlayed", now);
        localStorage.setItem("playing", "true");
        setPlaying(true);
        setGuesses([]);
      } else {
        // The reason for storing on both localstorage and state is to make sure state persists through refresh
        const isGuesses = localStorage.getItem("guesses");
        const guesses = isGuesses
          ? (JSON.parse(isGuesses) as unknown as GuessResult[])
          : [];
        const isPlaying = localStorage.getItem("playing");
        const playing = isPlaying
          ? (JSON.parse(isPlaying) as unknown as boolean)
          : true;
        setPlaying(playing);
        setGuesses(guesses);
      }
    };

    const initTheme = () => {
      if (
        localStorage["data-theme"] === "dark" ||
        (!("data-theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.getElementById("theme-checkbox")?.setAttribute("checked", "");
        document
          .getElementById("ak-wordle-root")
          ?.setAttribute("data-theme", "dark");
        setDarkMode(true);
      } else {
        document
          .getElementById("ak-wordle-root")
          ?.setAttribute("data-theme", "light");
      }
    };

    const initEndless = () => {
      // Init endless operator
      const ls = localStorage.getItem("endlessOp");
      const chosenEndlessOp: Operator | null= ls
        ? (JSON.parse(ls) as unknown as Operator)
        : null;

      // Init endless guesses
      const isGuesses = localStorage.getItem("endlessGuesses");
      const guesses = isGuesses
        ? (JSON.parse(isGuesses) as unknown as GuessResult[])
        : [];
      const isPlaying = localStorage.getItem("endlessPlaying");
      const playing = isPlaying
        ? (JSON.parse(isPlaying) as unknown as boolean)
        : true;
      setEndlessPlaying(playing);
      setEndlessGuesses(guesses);

      // So we can reset endless op if EXISTING angelina/suzuran bug
      if (chosenEndlessOp == null) {
        const newEndlessOp = allOperators[randomInteger(0, allOperators.length)]!
        setEndlessOp(newEndlessOp)
        localStorage.setItem("endlessOp", JSON.stringify(newEndlessOp))
      } else {
        setEndlessOp(chosenEndlessOp)
        if (chosenEndlessOp.name == "Angelina" || chosenEndlessOp.name == "Suzuran") { // Edge case for old bug
          if (guesses.filter(g => g.name == "Angelina" || g.name == "Suzuran").length > 0) {
            localStorage.setItem("endlessPlaying", "false");
            setEndlessPlaying(false);
          }
        }
      }
    }

    const initHighContrast = () => {
      if (localStorage.highContrast === "true") {
        document.getElementById("contrast-checkbox")?.setAttribute("checked", "");
        setHighContrast(true);
      } else if (!("highContrast" in localStorage)) {
        localStorage.setItem("highContrast", "false");
      }
    }

    const initPlayHistory = () => {
      const ls = localStorage.getItem("playHistory");
      const ph = ls ? (JSON.parse(ls) as unknown as Record<string, number>) : {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7+":0};
      setPlayHistory(ph);
    }

    const initSharePreference = () => {
      const ls = localStorage.getItem("sharePreference");
      const sp = ls ? (JSON.parse(ls) as unknown as Record<string, boolean>) : {markdown: true, guesses: true, hyperlink: true}
      setSharePreference(sp)
    }

    initPlayHistory();
    initEndless();
    initGuesses();
    initTheme();
    initHighContrast();
    initSharePreference();

  }, [allOperators]);

  const handleSubmit = (
    guess: Operator,
    callback: (success: boolean) => void,
  ) => {
    const pastGuesses = isNormalMode ? guesses : endlessGuesses;
    const res = compareGuess(guess, pastGuesses, isNormalMode ? stats.operator : endlessOp)

    if (res.valid && res.guessResult != null) {
      setError("");
      setIsInputDelay(true);
      // Insert the newest guess at the first index of the answer row array
      const newGuesses = [res.guessResult, ...pastGuesses];
      
      if (isNormalMode) {
        localStorage.setItem("guesses", JSON.stringify(newGuesses));
        setGuesses(newGuesses);
      } else {
        localStorage.setItem("endlessGuesses", JSON.stringify(newGuesses));
        setEndlessGuesses(newGuesses);
      }
      
      // Prevent the user from being able to input new guesses with an input delay, and to let the winning animation play fully
      // state change while this animation is occuring will stop the animation entirely.
      if (res.guessResult?.correct) {
        setTimeout(() => setIsInputDelay(false), 4000);

        if (isNormalMode) {
          localStorage.setItem("playing", "false");
          setPlaying(false);
          winMutation.mutate();

          // Set stats
          newGuesses.length < 7 ? playHistory[newGuesses.length]! += 1 : playHistory["7+"]! += 1
          setPlayHistory(playHistory)
          localStorage.setItem("playHistory", JSON.stringify(playHistory))
        } else {
          localStorage.setItem("endlessPlaying", "false");
          setEndlessPlaying(false);
        }
        
      } else {
        setTimeout(() => setIsInputDelay(false), 2500);
      }
      callback(true);
    } else {
      if (res.error.length > 0)
        isNormalMode ? setError(res.error) : setEndlessError(res.error)
      else {
        isNormalMode ? setError(`Something went wrong ${res.error}`) : setEndlessError(`Something went wrong ${res.error}`)
      }
      callback(false)
    }
  };

  const handleEndlessReset = () => {
    const newEndlessOp = allOperators[randomInteger(0, allOperators.length)]!
    setEndlessOp(newEndlessOp)
    localStorage.setItem("endlessOp", JSON.stringify(newEndlessOp))
    
    setEndlessPlaying(true);
    localStorage.setItem("endlessPlaying", "true")

    setEndlessGuesses([]);
    localStorage.setItem("endlessGuesses", JSON.stringify([]));
  }

  const handleThemeChange = (e: HTMLInputElement) => {
    const theme = e.checked ? "dark" : "light";
    localStorage.setItem("data-theme", theme);
    document
      .getElementById("ak-wordle-root")
      ?.setAttribute("data-theme", theme);
    setDarkMode(theme === "dark");
  };

  const handleContrastChange = (e: HTMLInputElement) => {
    localStorage.setItem("highContrast", JSON.stringify(e.checked));
    setHighContrast(e.checked)
  }

  const handleSharePreferenceUpdate = (category: string) => {
    let n: boolean;
    if (category === "markdown") {
      n = !sharePreference.markdown
      localStorage.setItem("sharePreference", JSON.stringify({...sharePreference, markdown: n}))
      setSharePreference({...sharePreference, markdown: n})
    } else if (category === "guesses") {
      n = !sharePreference.guesses
      localStorage.setItem("sharePreference", JSON.stringify({...sharePreference, guesses: n}))
      setSharePreference({...sharePreference, guesses: n})
    } else {
      n = !sharePreference.hyperlink
      localStorage.setItem("sharePreference", JSON.stringify({...sharePreference, hyperlink: n}))
      setSharePreference({...sharePreference, hyperlink: n})
    }
  }

  return (
    <>
      <Head>
        <title>Arknights Wordle</title>
        <meta name="description" content="An Arknights Wordle parody as a personal/passion project. Type in an operators name and try to guess the correct operator using 7 different categories. Created by Three6ty1" />
        <meta name="keywords" content="Arknights, Wordle, Arknights Wordle, Operators, Operator Wordle, Worlde, AK Wordle, Arknights Word Game, Arknights Parody, Arknights Game" /> 
        <meta name="author" content="Three6ty1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        id="ak-wordle-root"
        className={`justify-top flex h-full w-full flex-col items-center p-5 pt-10 text-center align-middle font-sans ` + (highContrast ? "theme-high-contrast" : "theme-default")}
      >
        <GameModeContext.Provider value={{playing, allOperators, stats, guesses, endlessGuesses, endlessPlaying, isNormalMode, setIsNormalMode, handleSubmit, endlessOp, handleEndlessReset}}>
          <ThemeContext.Provider value={{darkMode, handleThemeChange, highContrast, handleContrastChange}}>
            <Info /> {/** Info needs theme context due to darkmode logo */}
            <PlayHistoryContext.Provider value={{playHistory}}>
              <Hints />
              <SearchError error={error} endlessError={endlessError} />
          
              <div className="grid w-full justify-center">
                <SharePreferenceContext.Provider value ={{sharePreference, handleSharePreferenceUpdate}}>
                  <SearchAndShare isInputDelay={isInputDelay} playing={playing}/>
                </SharePreferenceContext.Provider>
                <PastGuesses />
              </div>
            </PlayHistoryContext.Provider>
          </ThemeContext.Provider>
        </GameModeContext.Provider>
      </main>
    </>
    
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const stats = await getStats();
  const allOperators = await getAllOperators();

  return {
    props: {
      stats,
      allOperators,
    },
  };
};
