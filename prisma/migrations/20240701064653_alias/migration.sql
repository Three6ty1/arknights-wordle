-- AlterTable
ALTER TABLE "Operator" ADD COLUMN     "alias" TEXT[] DEFAULT ARRAY[]::TEXT[];
