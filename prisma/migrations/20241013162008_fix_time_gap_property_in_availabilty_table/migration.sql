/*
  Warnings:

  - You are about to drop the column `timegap` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `timeGap` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Availability" DROP COLUMN "timegap",
ADD COLUMN     "timeGap" INTEGER NOT NULL;
