/*
  Warnings:

  - The `duration` column on the `Video` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `userId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Video" ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "duration",
ADD COLUMN     "duration" DOUBLE PRECISION;
