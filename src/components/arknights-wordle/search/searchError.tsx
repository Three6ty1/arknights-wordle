import React from "react"
import { GameModeContext } from "~/pages/index"

type Props = {
  error: string,
  endlessError: string,
}

export default function SearchError({error, endlessError} : Props) {
  const {isNormalMode} = React.useContext(GameModeContext)

  return (
    <>
      {isNormalMode ?
      <>
        {error != "" ? <p className="text-red-500">{error}</p> : null}
      </>
      :
      <>
        {endlessError != "" ? <p className="text-red-500">{endlessError}</p> : null}
      </>
      }
    </>
  )
}