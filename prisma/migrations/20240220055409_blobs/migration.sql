-- CreateEnum
CREATE TYPE "BlobTags" AS ENUM ('PROJECTS', 'HOBBIES', 'MUSIC', 'GAMES', 'MALARKEY', 'OTHER');

-- CreateTable
CREATE TABLE "Blob" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "edit" TIMESTAMP(3),
    "title" TEXT NOT NULL,
    "description" TEXT,
    "tags" "BlobTags"[],
    "images" TEXT[],
    "videos" TEXT[],
    "likes" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Blob_pkey" PRIMARY KEY ("id")
);
