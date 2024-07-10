-- CreateTable
CREATE TABLE "Operator" (
    "charId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "group" TEXT,
    "nation" TEXT NOT NULL,
    "profession" TEXT NOT NULL,
    "archetype" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "infected" TEXT NOT NULL,
    "rarity" INTEGER NOT NULL,
    "costE0" INTEGER NOT NULL,
    "costE2" INTEGER NOT NULL,

    CONSTRAINT "Operator_pkey" PRIMARY KEY ("charId")
);

-- CreateTable
CREATE TABLE "ChosenOperators" (
    "gameId" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "operatorId" TEXT NOT NULL,
    "timesGuessed" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ChosenOperators_pkey" PRIMARY KEY ("gameId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Operator_name_key" ON "Operator"("name");

-- AddForeignKey
ALTER TABLE "ChosenOperators" ADD CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("charId") ON DELETE RESTRICT ON UPDATE CASCADE;
