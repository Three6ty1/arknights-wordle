import React from "react"
import { SharePreferenceContext, ThemeContext } from "~/pages"

const switchIcon = () => (
  <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
  </svg>
)

export default function SharePreference() {
  const {sharePreference, handleSharePreferenceUpdate} = React.useContext(SharePreferenceContext)
  const {highContrast} = React.useContext(ThemeContext)
  
  const inputStyle = "custom-bold border-2 p-2 h-fit " + (highContrast ? "border-info hover:border-info focus:border-info" : "border-success hover:border-success focus:border-success")

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn custom-bold">
        <svg  className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
        </svg>
        <span>Change the share format</span>
      </div>
      <div tabIndex={0} className="flex flex-col dropdown-content w-[220px] z-[100] mt-1 p-3 space-y-2 bg-base-100 shadow-sm shadow-neutral-content rounded-md ">
        <div className="text-nowrap flex flex-row flex-nowrap justify-start items-center space-x-2">
          <span>Share on</span>
          <select id="share-preference-select" className={`select select-ghost focus:outline-none w-[200px] ${inputStyle}`} value={sharePreference.platform} onChange={(e) => handleSharePreferenceUpdate("platform", e.target.value)}>
            <option value="other" className="text-base">Other platforms</option>
            <option value="discord" className="text-base">Discord</option>
            <option value="reddit" className="text-base">Reddit</option>
          </select>
        </div>

        {sharePreference.platform !== "other" &&
          <>
            <div className="text-nowrap flex flex-row justify-start items-center space-x-2">
              <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} onClick={() => handleSharePreferenceUpdate("guesses")}>
                <span>{sharePreference.guesses ? "with" : "without"}</span>
                {switchIcon()}
              </button>
              <span>the guesses and</span>
            </div>
            <div className="text-nowrap flex flex-row justify-start items-center space-x-2">
              <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} onClick={() => handleSharePreferenceUpdate("hyperlink")}>
                <span>{sharePreference.hyperlink ? "with" : "without"}</span>
                {switchIcon()}
              </button>
              <span>the hyperlink</span>
            </div>
          </>
        }
      </div>
    </div>
  )
}