import HistoryGraph from "../share/historyGraph";

export default function Statistics() {
  return (
    <>
      <button
        className="btn indicator-item tooltip m-2 flex w-1/5 items-center"
        data-tip="Statistics"
        onClick={() =>
          (
            document.getElementById("stats_modal") as HTMLDialogElement
          ).showModal()
        }
      >
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v15a1 1 0 0 0 1 1h15M8 16l2.5-5.5 3 3L17.273 7 20 9.667"/>
        </svg>

      </button>
      <dialog id="stats_modal" className="modal">
        <div className="modal-box h-2/3 md:h-auto">
          <h1 className="mb-2 text-xl font-bold">
            Your Stats
          </h1>
          <HistoryGraph />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
