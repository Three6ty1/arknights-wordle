import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import * as wordle from "./wordleServer";
import { db } from "~/server/db";
import type { Operator } from "@prisma/client";

// import { z } from "zod";
// const operatorSchema = z.object({
//     id: z.number(),
//     charId: z.string(),
//     name: z.string(),
//     gender: z.string(),
//     race: z.string(),
//     group: z.string().nullable(),
//     nation: z.string(),
//     profession: z.string(),
//     archetype: z.string(),
//     position: z.string(),
//     infected: z.string(),
//     rarity: z.number(),
//     costE0: z.number(),
//     costE2: z.number(),
// })

export const wordleRouter = createTRPCRouter({
    // Mutation because we might generate a new operator
    stats: publicProcedure
        .query(async ({ ctx }) => {
            const res = await wordle.getOperatorStats(ctx.db);
            return res;
    }),

    allOperators: publicProcedure
        .query(async ({ ctx }) => {
            return await wordle.getAllOperators(ctx.db);
    }),

    updateWins: publicProcedure
        .mutation(async ({ ctx }) => {
            await wordle.updateWins(ctx.db);
        })
});

export const getStats = async() => {
    return await wordle.getOperatorStats(db);
}

export const getAllOperators = async() => {
    return await wordle.getAllOperators(db);
}

export type Stats = {
    gameId: number;
    date: string;
    operator: Operator;
    timesGuessed: number;
}