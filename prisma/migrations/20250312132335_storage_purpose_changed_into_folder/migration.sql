/*
  Warnings:

  - You are about to drop the column `storageId` on the `File` table. All the data in the column will be lost.
  - You are about to drop the `Storage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `folderId` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_storageId_fkey";

-- DropForeignKey
ALTER TABLE "Storage" DROP CONSTRAINT "Storage_userId_fkey";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "storageId",
ADD COLUMN     "folderId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Storage";

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Folder_userId_key" ON "Folder"("userId");

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
