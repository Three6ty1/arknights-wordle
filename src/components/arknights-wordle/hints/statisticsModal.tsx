import HistoryGraph from "../share/historyGraph";

export default function StatisticsModal() {
  return (
    <dialog id="stats_modal" className="modal">
        <div className="modal-box h-2/3 md:h-auto">
          <h1 className="mb-2 text-xl custom-bold">
            Your Stats
          </h1>
          <HistoryGraph />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
  )
}