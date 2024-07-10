import type { Operator } from "@prisma/client";
import { Range, Correctness } from '~/helper/helper';

export type GuessResult = {
    charId: string,
    name: string,
    gender: {guess: string, result: boolean},
    race: {guess: string, result: boolean},
    allegiance: {guess: string, result: Correctness},
    infected: {guess: string, result: boolean},
    profession: {guess: string, result: boolean},
    rarity: {guess: number, result: Range},
    cost: {guess: number[], result: Range},
    correct: boolean,
}

export type CompareResponse = {
    guessResult: GuessResult | null,
    valid: boolean,
    error: string,
}

const compareGuessLogic = (answer: Operator, guess: Operator):GuessResult => {
    /**
     * Groups take precedence in allegiances over nation (more specific)
     * 
     * AG, GG (Answer Group, Guess Group)
     * AG, GN (Guess Nation)
     * AN, GG etc...
     * AN, GN
    */
    let allegiance_res;
    if (answer.group && guess.group) { // AG, GG
        // Answer has group, guess has group
        if (answer.group == guess.group) {
            allegiance_res = Correctness.Correct;
        } else { // Wrong group but same nation (Like Rhodes Island)
            allegiance_res = (answer.nation == guess.nation) ? Correctness.Half : Correctness.Wrong;
        }
    } else if (!answer.group && !guess.group) { // AN, GN
        allegiance_res = (answer.nation == guess.nation) ? Correctness.Correct : Correctness.Wrong;
    } else { // AG, GN || AN, GG Can't compare the groups to nations as their scope is different, can only compare nations and be half correct.
        allegiance_res = (answer.nation == guess.nation) ? Correctness.Half : Correctness.Wrong;
    }

    const res = {
        gender: {guess: guess.gender, result: answer.gender === guess.gender},
        race: {guess: guess.race, result: answer.race === guess.race},
        allegiance: { guess: guess.group ? guess.group : guess.nation, result: allegiance_res },
        infected: {guess: guess.infected, result: answer.infected === guess.infected},
        profession: {guess: guess.profession, result: answer.profession === guess.profession},
        rarity: {guess: guess.rarity, result: ((answer.rarity < guess.rarity) ? Range.Lower : (answer.rarity > guess.rarity) ? Range.Higher : Range.Correct)},
        cost: {guess: [guess.costE0, guess.costE2], result: ((answer.costE2 < guess.costE2) ? Range.Lower : (answer.costE2 > guess.costE2) ? Range.Higher : Range.Correct)},
    }
    
    const correct = res.gender.result &&
    res.race.result &&
    res.allegiance.result == Correctness.Correct &&
    res.profession.result &&
    res.rarity.result == Range.Correct &&
    res.cost.result == Range.Correct &&
    res.infected.result

    return {
        charId: guess.charId,
        name: guess.name,
        ...res,
        correct: correct && guess.charId == answer.charId,
    }
}

// Compare the guess with the operator of the day
export const compareGuess = (guessOp: Operator, pastGuesses: GuessResult[], correctOp: Operator):CompareResponse => {
    const guesses = pastGuesses.map((guess) => guess.name);
    
    if (guesses.includes(guessOp.name)) {
        console.log("dupe")
        return {
            guessResult: null,
            valid: false,
            error: "Operator has already been guessed",
        }
    }

    return {
        guessResult: compareGuessLogic(correctOp, guessOp),
        valid: true,
        error: "",
    }
}