import { PrismaClient } from "@prisma/client";
import db from '../operator_db.json';

// To run
////////// DO NOT SEED BEFORE UPDATING SCHEMA VIA NPX PRISMA MIGRATE DEV
// "npx prisma db seed"
// npx prisma db seed update // will update all operators with information
// npx prisma db seed
// Operator in DB will always be offset by 5 due to deleting the IS operators (5)
// dumb shit prisma seeding
// https://github.com/prisma/prisma/issues/7053#issuecomment-1679880184

// Not the same as prisma operator
interface Operator {
  charId: string;
  alias: string[];
  gender: string;
  race: string;
  group?: string;
  nation: string;
  profession: string;
  archetype: string;
  position: string;
  rarity: number;
  cost: number[];
  infected: string;
}

const args = process.argv.slice(2)
let update = false
if (args.length > 0) {
  if (args[0] === "update") {
    update = true
    console.log("Updating Fields arg set")
  }
}

const prisma = new PrismaClient()
async function main() {
  let amt = 0
  const operator_db: Record<string, Operator> = db;
  // await prisma.operator.deleteMany()
  const operators = await prisma.operator.count();
  for (const key in operator_db) {
      const operator = operator_db[key]
      if (!operator) {
        throw `Missing operator ${key}`
      }
      if (!operator.cost[0] || !operator.cost[1]) {
        throw `Missing operator cost for ${key}`
      }
      // Upsert will auto increment postgres ids...
      const inDB = await prisma.operator.findFirst({
        where: {
          name: key,
        }
      })

      if (inDB) {
        if (update) {
          await prisma.operator.update({
            where: {
              name: key,
            },
            data: {
              alias: operator.alias,
              charId: operator.charId,
              group: operator.group ? operator.group : null,
            },
          })
        }
      } else {
        await prisma.operator.create({
          data: {
              id: undefined,
              charId: operator.charId,
              name: key,
              alias: operator.alias,
              gender: operator.gender,
              race: operator.race,
              group: operator.group ? operator.group : null,
              nation: operator.nation,
              profession: operator.profession,
              archetype: operator.archetype,
              position: operator.position,
              rarity: operator.rarity,
              costE0: operator.cost[0],
              costE2: operator.cost[1],
              infected: operator.infected,
          },
      });
      }
      
      // Old fallback code
      // if (operator.group !== '') {
      //     await prisma.operator.update({
      //         where: {
      //             charId: operator.charId
      //         },
      //         data: {
      //             group: operator.group
      //         }
      //     })
      // }

      amt += 1
  }

  console.log(amt + ' total operators seeded into db');
  console.log(`(${await prisma.operator.count() - operators}) new operators seeded (Old ${operators})`);
}

main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
