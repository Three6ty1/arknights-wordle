const helpIcon = () => (
  <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
  </svg>
)

export default function HelpMenu() {
  return (
    <>
      <button
        className="indicator-item custom-dropdown-items space-x-2"
        data-tip="Help and Info"
        onClick={() =>
          (
            document.getElementById("help_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        {helpIcon()}
        <span>Help</span>
      </button>
    </>
  );
}
