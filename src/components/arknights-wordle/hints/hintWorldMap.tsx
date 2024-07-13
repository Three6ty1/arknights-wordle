import React from "react";

const regions = {
  Ægir: "Aquatic animals and Seaborn.\nGroups: Abyssal Hunters.",
  Bolivar: "Mainly Perros: Dogs.",
  Columbia: "Varied.\nGroups: Blacksteel, Rhine Lab.",
  Higashi: "Oni and some Ægir.",
  Iberia: "Mainly Liberi: Birds.",
  Kazimierz: "Mainly Kuranta: Horses and Zebras.\nGroups: Pinus Sylvestris.",
  Kjerag: "Varied. Snow Realm.",
  Laterano: "Mainly Sankta: Angels and Liberi: Birds.",
  Leithanien: "Mainly Caprinae: Goats/Sheep and Elafia: Deer.",
  Lungmen: "Varied.\nGroups: Lee's Detective Agency, LGD, Penguin Logistics.",
  Minos: "Mainly Forte: Bovines/Camels.",
  "Rhodes Island":
    "Varied.\nGroups: Elite Ops, Followers, Op-teams, S.W.E.E.P.",
  "Rim Billiton": "Mainly Cautus: Rabbits and Hares.",
  Sami: "Mainly Elafia: Deer",
  Sargon: "Mainly Archosauria: Crocodilians and Pythia: Serpents.",
  Siracusa: "Mainly Lupo: Wolves and Vulpo: Foxes.\nGroups: Chiave's Gang.",
  Ursus: "Mainly Ursus: Bears.\nGroups: Ursus Student Self-Governing Group.",
  Victoria: "Mainly Feline: Cats.\nGroups: Dublinn, Glasgow.",
  Yan: "Varied. Ruled by Lung.\nGroups: Sui.",
};

export default function HintWorldMap() {
  const handleClick = () => {
    (
      document.getElementById("world_map_modal") as HTMLDialogElement
    ).showModal();
  };

  return (
    <>
      <div className="indicator m-2 flex w-1/3">
        <button
          className="btn tooltip flex w-full items-center"
          data-tip="Regions and Races"
          onClick={() => handleClick()}
        >
          <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M4.37 7.657c2.063.528 2.396 2.806 3.202 3.87 1.07 1.413 2.075 1.228 3.192 2.644 1.805 2.289 1.312 5.705 1.312 6.705M20 15h-1a4 4 0 0 0-4 4v1M8.587 3.992c0 .822.112 1.886 1.515 2.58 1.402.693 2.918.351 2.918 2.334 0 .276 0 2.008 1.972 2.008 2.026.031 2.026-1.678 2.026-2.008 0-.65.527-.9 1.177-.9H20M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
        </button>
      </div>
      <dialog id="world_map_modal" className="modal overflow-visible">
        <div className="no-scrollbar no-scrollbar::-webkit-scrollbar modal-box h-2/3 md:h-auto max-w-[95vw] md:w-3/5 mt-5 p-2 md:p-6 flex flex-row flex-wrap justify-start">
          {Object.entries(regions).map(region => (
            <div tabIndex={0} className="collapse w-1/2 md:w-1/4 text-left md:p-2" key={region[0]}>
              <div className="collapse-title text-xl font-bold">{region[0]}</div>
              <div className="collapse-content">
                <p className="whitespace-pre-line">{region[1]}</p>
              </div>
            </div>
          ))}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
