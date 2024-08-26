import SearchBar from "./searchBar";
import React from "react";
import Result from "./result";
import type { Operator } from "@prisma/client";

interface SearchContextValue {
  results: Operator[],
  setResults: (v: Operator[]) => void,
  input: string,
  setInput: (v: string) => void,
  setSearchFocused: (v: boolean) => void,
}

export const SearchContext = React.createContext<SearchContextValue>(undefined as unknown as SearchContextValue)

export default function Search() {
  const [results, setResults] = React.useState<Operator[]>([]);
  const [searchFocused, setSearchFocused] = React.useState(false)
  const [input, setInput] = React.useState("");

  return (
    <div className="flex w-full flex-col items-center">
      <SearchContext.Provider value={{results, setResults, setSearchFocused, input, setInput}}>
        <SearchBar />
        {results.length > 0 && (
          <div

          className={`absolute mt-[52px] py-2 max-h-[35vh] md:max-h-[50vh] w-[80vw] sm:w-[475px]
                      flex flex-col overflow-x-hidden overflow-y-scroll no-scrollbar no-scrollbar::-webkit-scrollbar
                      rounded-md bg-base-100 shadow-sm shadow-base-content 
                      ${searchFocused ? "z-[100]" : "hidden"}`}
          >
            {results.map((op, index) => (
              <Result
                key={index}
                operator={op}
              />
            ))}
          </div>
        )}
      </SearchContext.Provider>
    </div>
  );
}
