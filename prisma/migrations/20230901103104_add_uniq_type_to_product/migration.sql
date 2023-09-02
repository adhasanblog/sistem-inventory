/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Product_type_key` ON `Product`(`type`);
