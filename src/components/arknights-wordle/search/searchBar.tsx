import type { Operator } from "@prisma/client";
import React from "react";
import { SearchContext } from "./search";
import { GameModeContext } from "~/pages/index";

export default function SearchBar() {
  const {results, setResults, setSearchFocused, input, setInput} = React.useContext(SearchContext)
  const {allOperators, handleSubmit, isInputDelay} = React.useContext(GameModeContext)

  const handleChange = (value: string) => {
    setInput(value);

    // Empty case
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    // Area59 CC Beta Max Risk Team!
    if (value.trim().toUpperCase().replaceAll(",", "") == "THE SKY WILL BURN SO BRIGHT FOR ONLY YOU AND I IVE BECOME YOUR SHADOW YOUR MISERY WAS MINE TELL ME WHAT ITS LIKE TO BE ON THE OTHER SIDE IVE BECOME SHAPELESS NOW TASTE YOUR OWN DIVINE") {
      setResults([...allOperators.filter(op => 
        op.charId == "char_263_skadi" ||
        op.charId == "char_248_mgllan" ||
        op.charId == "char_241_panda" ||
        op.charId == "char_355_ethan" ||
        op.charId == "char_010_chen" ||
        op.charId == "char_202_demkni" ||
        op.charId == "char_143_ghost" ||
        op.charId == "char_112_siege" ||
        op.charId == "char_151_myrtle" ||
        op.charId == "char_172_svrash" ||
        op.charId == "char_188_helage" ||
        op.charId == "char_106_franka" ||
        op.charId == "char_144_red"
      )])
      return
    }

    const inputLower = value.toLowerCase().trim();

    const results: Operator[] = []
    const aliasResults: Operator[] = []

    for (const op of allOperators) {
      const op_lower = op.name.toLowerCase();

      if (
        op_lower.startsWith(inputLower) ||
        op_lower.replaceAll("'", "").startsWith(inputLower.replaceAll("'", "")) ||
        op_lower.replace("ł", "l").startsWith(inputLower) || // special cases for Pozyomka and Mylnar
        op_lower.replace("ë", "yo").startsWith(inputLower)
      ) {
        results.push(op)
      } else {
        const matchingAlias = op.alias.filter(a => {
          const lower = a.toLowerCase()
          return lower.startsWith(inputLower) || lower.startsWith(inputLower.replaceAll("'", ""))
        })
        if (matchingAlias.length > 0) {
          aliasResults.push(op)
        }
      }
    }

    setResults([...results, ...aliasResults]);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      let guess;
      if (results.length > 0 && results[0]) {
        guess = results[0];
      } else {
        return;
      }
      
      setResults([]);

      handleSubmit(
        guess,
        () => setInput("")
      );
    }
  };

  return (
    <div className="flex w-full flex-row items-center justify-center" onFocus={() => setSearchFocused(true)} onBlur={() => setTimeout(() => setSearchFocused(false), 100)}>
      <input
        name="operator-guess"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => handleKey(e)}
        placeholder="Start typing an operator name"
        className="input input-bordered w-[80vw] sm:w-[475px] text-center"
        type="text"
        disabled={isInputDelay}
      />
    </div>
  );
}
