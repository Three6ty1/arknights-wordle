import { PlayHistoryContext } from "~/pages"
import React from "react"

export default function HistoryGraph() {
  const { playHistory } = React.useContext(PlayHistoryContext);

  let total = 0

  const maxi = Object.values(playHistory).reduce((x, y) => {
    total += y 
    return x > y ? x : y
  }, 0)

  return (
    <div  className="flex flex-col w-full">
      <div className="flex flex-row space-x-1 items-center justify-center">
        <p>{total} total games</p>
      </div>
      <div className="space-y-1 items-center justify-center">
        {Object.keys(playHistory).map((k, index) => 
          (
            <div key={index} className="flex flex-row items-center justify-left">
              <div className="w-2 text-center mr-2">{k}</div>
              {playHistory[k]! > 0 && 
                <div className="tooltip flex w-full flex-row items-center bg-current justify-end" data-tip={`${Math.floor((playHistory[k]!/total) *100)}%`} style={{width: ((playHistory[k]!/maxi) *100) + "%"}}>
                  <p className="text-base-100 font-bold mr-1 md:mr-2">{playHistory[k]}</p>
                </div>
              }
            </div>
          )
        )}
      </div>
      <p className="text-sm pt-2">*Stats are stored locally and will be lost when you clear your cache</p>
    </div>
  )
}