// Inclusive of min, Exclusive of max
export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ICON_DIR =
  "https://raw.githubusercontent.com/Three6ty1/ak-wordle-icons/main/avatars/";
export const PROFESSION_ICON_DIR =
  "https://raw.githubusercontent.com/Three6ty1/ak-wordle-icons/main/classes/black/";

export enum Range {
  Lower = "Lower",
  Correct = "Correct",
  Higher = "Higher",
}

export enum Correctness {
  Wrong = "Wrong",
  Half = "Half",
  Correct = "Correct",
}

export const wordleColors = {
  incorrect: "#919090",
  higher: "#08aadd",
  lower: "#c80000",
  half: "#FFAC1C",
  correct: "#6BBF59",
};

export function getOperatorIconUrl(charId: string, rarity: number) {
  let url;
  if (rarity > 3) {
    url = ICON_DIR + charId + "_2.webp";
  } else {
    url = ICON_DIR + charId + ".webp";
  }

  return url;
}

export function getProfessionIconUrl(profession: string) {
  return (
    PROFESSION_ICON_DIR +
    "icon_profession_" +
    profession.toLowerCase() +
    "_large.png"
  );
}

// Returns a date string in the format of 15 Feb 2024 in Sydney Australia time AEST UTC+10:00
export function getDateString() {
  return new Date().toLocaleString("en-AU", {timeZone: "Australia/Sydney", dateStyle: "medium"});
}

export const raceToolTips = {
  Ægir: "Seaborn and Aquatic animals",
  Anasa: "Asuras, Rakshasas and Yakshas (Hindu-Buddhist mythology)",
  Anaty: "Otters, Weasels, Raccoons and Wolverines",
  Anura: "Frogs",
  Archosauria: "Crocodilians",
  Aslan: "Lions",
  Caprinae: "Goats and Sheeps",
  Cautus: "Rabbits and Hares",
  Cerato: "Rhinoceroses",
  Chimera: "Hybrid race",
  Draco: "European dragons",
  Durin: "Dwarves",
  Elafia: "Deers",
  Feline: "Cats, Big cats and Mongooses (Exc. Aslan: Lions)",
  Forte: "Bovines and camelids",
  Itra: "Musk Deer",
  Kuranta: "Horses and Zebras",
  Kylin: "Qilin (Chinese mythology)",
  Liberi: "Birds and Bird-like mythological creatures",
  Lung: "Chinese dragons",
  Lupo: "Wolves",
  Manticore: "Manticore (one) (Persian mythology)",
  Oni: "Oni (Japanese mythology)",
  Perro: "Dogs",
  Petram: "Turtles and Tortoises",
  Pilosa: "Sloths",
  Pythia: "Serpents",
  Rebbah: "Hyenas",
  Robot: "Beep Boop",
  Sankta: "Angels (Abrahamic religions)",
  Sarkaz: "Demons (Abrahamic religions)",
  Savra: "Lizards and Salamanders",
  Ursus: "Bears",
  Vouivre: "Wyverns, Wyrms, Hydras, Amphipteres (Winged Serpents)\nand Drakes",
  Vulpo: "Foxes",
  Zalak: "Rodents, Opposums and Moles",
  "Credits to": "Arknights Fandom wiki",
};

export const guessCategoryToolTips = {
  Operator: null,
  Gender: "Male/Female",
  Race: null,
  Allegiance: "The Group/Team > Nation the operator represents.",
  Infected: "Yes/No/Undisclosed",
  Profession: null,
  Rarity: "1/2/3/4/5/6 star",
  "Cost (E2)": "Cost is compared at E2 Pot0.",
};

export const costToolTips = {
  Higher:
    "The E2 cost of the correct operator is HIGHER\nthan this operators E2 cost.",
  Lower:
    "The E2 cost of the correct operator is LOWER\nthan this operators E2 cost.",
};
