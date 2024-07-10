import { getDateString, randomInteger } from '~/helper/helper';
import type { Prisma, PrismaClient } from '@prisma/client';
import type { DefaultArgs } from '@prisma/client/runtime/library';

// Chooses a new operator for today
// Restrains the new operator to not have been picked in the last TOTAL_OPERATORS/2 days
const chooseNewOperator = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const operators = await db.operator.findMany();
    // Get the operator length / 2 most recent queries
    const halfChosen = await db.chosenOperators.findMany({
        select: {
            operatorId: true,
        },
        orderBy: {
            gameId: 'desc',
        },
        take: operators.length/2,
    })

    while(true) {
        // Get a random operator
        const toChoose = operators[randomInteger(0, operators.length)];

        if (toChoose == undefined) {
            throw "Invalid operator chosen. Not possible?"
        }

        if (halfChosen.filter((o) => o.operatorId == toChoose.id).length == 0) {
            return toChoose
        }
    } 
}

const handleNewDay = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>, date: string) => {
    const chosen = await chooseNewOperator(db);
    
    const res = await db.chosenOperators.create({
        data: {
            date: date,
            operatorId: chosen.id,
            timesGuessed: 0,
        }
    });
    console.log(`New Operator chosen ${chosen.name}`)

    return res;
}

const getTodayOperator = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const date = getDateString();

    // Is there a game created for today?
    let chosen = await db.chosenOperators.findFirst({
        where: { date: date },
    })

    if (!chosen) {
        chosen = await handleNewDay(db, date);
    }

    const op = await db.operator.findFirst({
        where: { id: chosen.operatorId}
    })

    const res = {
        gameId: chosen.gameId,
        date: chosen.date,
        operator: op,
        timesGuessed: chosen.timesGuessed 
    }

    return res
}

// Get the stats of the currently chosen operator
export const getOperatorStats = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    return getTodayOperator(db);
}

// Get a list of all the operator names in the database
export const getAllOperators = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const ops = await db.operator.findMany({
        orderBy: {
            name: 'asc',
        }
    });

    return ops;
}

export const updateWins = async(db: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) => {
    const date = getDateString();

    // Need transaction here to prevenot race condition on updating the wins.
    await db.$transaction(async (tx) => {
        const chosenOperator = await tx.chosenOperators.findFirst({
            where: { date: date },
        })
        
        await tx.chosenOperators.update({
            where: { gameId: chosenOperator?.gameId },
            data: {timesGuessed: {
                increment: 1,
            }}
        })
    })
}