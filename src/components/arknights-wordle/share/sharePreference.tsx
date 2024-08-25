import React from "react"
import { SharePreferenceContext, ThemeContext } from "~/pages"

const switchIcon = () => (
  <svg className="w-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m16 10 3-3m0 0-3-3m3 3H5v3m3 4-3 3m0 0 3 3m-3-3h14v-3"/>
  </svg>
)

const shareIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
  </svg>
)

type Props = {
  handleShare: () => void,
}

export default function SharePreference({handleShare} : Props) {
  const {sharePreference, handleSharePreferenceUpdate} = React.useContext(SharePreferenceContext)
  const {highContrast} = React.useContext(ThemeContext)
  
  const inputStyle = "custom-bold border-2 p-2 h-fit " + (highContrast ? "border-info hover:border-info focus:border-info" : "border-success hover:border-success focus:border-success")

  return (
    <div tabIndex={0} className="flex flex-row flex-wrap justify-center">
      <div className="text-nowrap flex flex-row flex-nowrap justify-start items-center space-x-2 mr-2">
        <span>Share on</span>
        <select id="share-preference-select" className={`select focus:outline-none w-[140px] ${inputStyle}`} value={sharePreference.platform} onChange={(e) => handleSharePreferenceUpdate("platform", e.target.value)}>
          <option value="other" className="text-base">Other platforms</option>
          <option value="discord" className="text-base">Discord</option>
          <option value="reddit" className="text-base">Reddit</option>
        </select>
      </div>

      <div className="text-nowrap flex flex-row justify-start items-center space-x-2 mr-2">
        <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} disabled={sharePreference.platform === "other"} onClick={() => handleSharePreferenceUpdate("guesses")}>
          <span>{sharePreference.guesses ? "with" : "without"}</span>
          {switchIcon()}
        </button>
        <span>the guesses and</span>
      </div>

      <div className="text-nowrap flex flex-row justify-start items-center space-x-2 mt-2 mr-2">
        <button className={`btn btn-ghost hover:bg-transparent ${inputStyle}`} disabled={sharePreference.platform === "other"} onClick={() => handleSharePreferenceUpdate("hyperlink")}>
          <span>{sharePreference.hyperlink ? "with" : "without"}</span>
          {switchIcon()}
        </button>
        <span>the hyperlink</span>
      </div>

      <button className={`${highContrast ? "btn-info" : "btn-success"} custom-bold btn text-white w-fit mt-2`} onClick={() => {handleShare()}}>
        {shareIcon()}
        Copy again
      </button>
    </div>
  )
}