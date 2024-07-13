import { getOperatorIconUrl } from "~/helper/helper"
import Image from "next/image";
import React from "react";

const versions = [
  {
    version: "2.0",
    date: "14th July 2024",
    content: 
    `- This pop up on a new version
    - New domain name (yay), paying money to host now (noo). Learning experience and increased employability? (copium)
    - Added more operator nicknames and a fully matched ultra-super \"nickname\". The hint is \"CC\"
    - Font is now local to the site, therefore there shouldn't be any missing fonts going forward
    - Stats for play history. I do not plan on tracking global stats for each day since this game is supposed to be casual
    - Re-enabled tooltips for mobile after tweaking the positioning
    - Minor changes including font-weight, sizes and text breaking for answer rows
    - Ops up to Degenbrecher banner will be added as soon as Aceship translates their profiles. This means CN ops will never be added early
    - If this site ever gets super popular in the far future I may need to implement ads. I promise they will be non-intrusive and you will not need to disable your adblocker.
    - I've been job hunting even before this popped off, therefore from now I will only maintain operator updates and bug fixes until I have the time. I also have other projects I want to get started on.
    
    Thanks for playing!`
  },
  {
    version: "1.4",
    date: "6th July 2024",
    content: 
    `- Fixed bug where recent chosen operators are chosen again
    - Keep in mind that the database did get nuked so there will be overlaps with the previous month of operators
    - I manually reset the operator, so reset your cache for the operator today if you've already guessed
    - Added Endless mode. I did not add the share functionality as I didn't find a reason as to why you'll share endless. It's easy enough to add it in the future though
    - Code base refactoring and cleaning up. Me from 6 months ago would be proud
    - This will be the last update ON THIS DOMAIN. I will start porting over this project off of Vercel
    - No promises as to when it will happen but everyone will have a weeks notice and I'll have a popup when you visit the site`
  },
  {
    version: "1.3.1",
    content: "- i mispelled wordle in the discord linking text and forgot to add the <> to remove the embed im very sorry"
  },
  {
    version: "1.3",
    date: "2nd July 2024",
    content: 
    `- Had to reset the database
    - Added share with markdown feature to reduce text length by hyperlinking url (Mainly for Discord)
    - Added metadata and icon to the site. Wordle and Arknights Rhodes Island icons were used and edited
    - Added alias searching for cases such as Kirin Yato and Rathalos Noir Corne
    - Added a bunch of joke aliases/nicknames. I hope everyone has as much fun discovering them as I did adding them
    - For example, try searching for \"Doggo\" (sorry namie) :^)
    - I plan on adding an endless mode (Client side)
    - Till next time, Wdance`
  },
  {
    version: "1.2",
    content: 
    `- Moved all the compare logic to the client side to reduce function invocation limits
    - There was an earlier caching oversight causing the client to not rollover to the new operator, apologies for that. Feel free to abuse local storage to refresh/mess around with the guesses
    - Website might be migrated to another host in the near future therefore the URL will change. Vercel charges $30AUD per month (insert sobbing emoji)`,
  },
  {
    version: "1.1",
    date: "30th June 2024",
    content: 
    `- Removed world map to save server costs
    - Deleted IS exclusive 5* operators
    - Added this update log
    - Added operators up to and including Viviana's banner. Previously only up to Executor-Alter banner (+20)
    - Added missing operators Friston-3 and U-Official (+2)`,
    added: [["char_2012_typhon", 6], ["char_1034_jesca2", 6], ["char_4088_hodrer", 6],["char_4098_vvana", 6],["char_245_cello", 6], ["char_4093_frston", 1], ["char_4091_ulika", 1]],
  },
  {
    version: "1.0",
    date: "March 2024",
    content: 
    `Hello Dokutah's, this is just a personal project of mine that I wanted to make for fun. Don't expect consistent updates since I will definitely fall behind on content eventually.
    \nUntil I figure out a way to get suggestions from the community, I will keep on adding features that I think are appropriate.
    \nThe database of this project depends on the Aceship github icons and gamedata repo, so my thanks goes out for the maintainers of that site.
    \nAnd lastly, thank you for playing - Three6ty1`
  }
]

export default function VersionLog() {
  React.useEffect(() => {
    const initVersionModal = () => {
      const prev_version = localStorage.getItem("version")
      
      if (prev_version != versions[0]?.version) {
        (document.getElementById('version_modal') as HTMLDialogElement).showModal()
        localStorage.setItem("version", versions[0]!.version)
      }
    }

    initVersionModal()
  }, [])

  return (
    <>
      <button className="underline" onClick={()=>(document.getElementById('version_modal') as HTMLDialogElement).showModal()}>v{versions[0]?.version}</button>
      <dialog id="version_modal" className="modal">
        <div className="modal-box flex flex-col space-y-2 md:space-y-6 no-scrollbar no-scrollbar::-webkit-scrollbar overflow-y-scroll h-2/3">
          {versions.map((currentVersion) => (
            <div className="flex flex-col" key={`${currentVersion.version} key`}>
              <h3 className="font-bold text-lg">Version {currentVersion.version}{currentVersion.date? " - " + currentVersion.date : ""}</h3>
              <p className="whitespace-pre-line float-left text-left">{currentVersion.content}</p>
              {currentVersion.added ?
                <div className="flex flex-wrap">
                  {currentVersion.added.map(char => {
                    if (typeof char[0] === 'string' && typeof char[1] === 'number') {
                      const url = getOperatorIconUrl(char[0], char[1])

                      return <Image
                        key={`${char[0]} version icon`}
                        className="m-[0.5px] rounded-md border-[0.1px] border-solid border-incorrect"
                        src={url}
                        alt={`${char[0]} operator icon`}
                        width={50}
                        height={50}
                      />
                    }
                    console.log("Could not load " + char[0])
                    return <></>
                  })}
                </div>
                :
                <></>
              }
            </div>
          ))}
      </div>
      <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}