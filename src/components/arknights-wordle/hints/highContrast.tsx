import React from "react";
import { ThemeContext } from "~/pages";

export default function HighContrast() {
  const {highContrast, handleContrastChange} = React.useContext(ThemeContext)

  return (
    <label className="swap swap-rotate justify-start custom-dropdown-items">
      {/* this hidden checkbox controls the state */}
      <input
        id="contrast-checkbox"
        type="checkbox"
        className="theme-controller hidden"
        value="contrast"
        onClick={(e) => handleContrastChange(e.target as HTMLInputElement)}
      />
      {/* On icon */}
      <svg className="swap-on h-6 w-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z" clipRule="evenodd"/>
      </svg>

      {/* Off icon */}
      <svg className="swap-off h-6 w-6 fixed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
      </svg>

      <span className="ml-2"><span className="font-bold">Switch</span> to {highContrast ? "DEFAULT" : "HIGH CONTRAST"} colours</span>
    </label>
  )
}