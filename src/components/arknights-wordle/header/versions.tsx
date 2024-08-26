import { getOperatorIconUrl } from "~/helper/helper"
import Image from "next/image";
import React from "react";
import { versions } from "./versionsRaw";

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
      <button className="underline" onClick={()=> (document.getElementById('version_modal') as HTMLDialogElement).showModal()}>v{versions[0]?.version}</button>
      <dialog id="version_modal" className="modal">
        <div className="modal-box flex flex-col space-y-2 md:space-y-6 no-scrollbar no-scrollbar::-webkit-scrollbar overflow-y-scroll h-2/3">
          {versions.map((currentVersion) => (
            <div className="flex flex-col" key={`${currentVersion.version} key`}>
              <h3 className="custom-bold text-lg" tabIndex={0}>Version {currentVersion.version}{currentVersion.date? " - " + currentVersion.date : ""}</h3>
              <p className="whitespace-pre-line float-left text-left">{currentVersion.content}</p>
              {currentVersion.added &&
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
              }
              {currentVersion.link && 
                <a className="text-left underline text-blue-500" href={currentVersion.link.href} target="_blank">{currentVersion.link.text}</a>
              }
              {currentVersion.other &&
                <div tabIndex={1} className="collapse bg-none rounded-none mt-2 p-0 h-5 focus:h-full">
                  <div className="collapse-title underline min-h-0 h-5 p-0 text-left">Yapping (Comments)</div>
                  <div className="collapse-content m-0 p-0 mt-2">
                    <p className="whitespace-pre-line float-left text-left">{currentVersion.other}</p>
                  </div>
                </div>
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