import SearchBar from "./searchBar";
import React from "react";
import Result from "./result";
import type { Operator } from "@prisma/client";

interface SearchContextValue {
  results: Operator[],
  setResults: (v: Operator[]) => void,
}

export const SearchContext = React.createContext<SearchContextValue>(undefined as unknown as SearchContextValue)

export default function Search() {
  const [results, setResults] = React.useState<Operator[]>([]);

  return (
    <div className="flex w-full flex-col items-center">
      <SearchContext.Provider value={{results, setResults}}>
      <SearchBar />
      {results.length > 0 && (
        <div
          className="no-scrollbar .no-scrollbar::-webkit-scrollbar my-2 flex 
                    max-h-[35vh] w-[80vw] flex-col overflow-x-hidden 
                    overflow-y-scroll rounded-md bg-base-100 py-2 shadow-sm shadow-neutral-content
                    md:max-h-[50vh] md:w-[30vw]"
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
