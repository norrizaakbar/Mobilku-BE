/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `User` table. All the data in the column will be lost.
  - Added the required column `image1000` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image500` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
DROP COLUMN "url",
ADD COLUMN     "image1000" TEXT NOT NULL,
ADD COLUMN     "image500" TEXT NOT NULL;
