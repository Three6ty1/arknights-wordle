/*
  Warnings:

  - The primary key for the `Operator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `charId` on the `Operator` table. All the data in the column will be lost.
  - Changed the type of `operatorId` on the `ChosenOperators` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ChosenOperators" DROP CONSTRAINT "ChosenOperators_operatorId_fkey";

-- AlterTable
ALTER TABLE "ChosenOperators" DROP COLUMN "operatorId",
ADD COLUMN     "operatorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Operator" DROP CONSTRAINT "Operator_pkey",
DROP COLUMN "charId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Operator_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "ChosenOperators" ADD CONSTRAINT "ChosenOperators_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "Operator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
