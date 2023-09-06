/*
  Warnings:

  - Made the column `stock` on table `stock` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `stock` MODIFY `stock` INTEGER NOT NULL;
