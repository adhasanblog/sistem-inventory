/*
  Warnings:

  - A unique constraint covering the columns `[brand_name]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category_name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Brand_brand_name_key` ON `Brand`(`brand_name`);

-- CreateIndex
CREATE UNIQUE INDEX `Category_category_name_key` ON `Category`(`category_name`);
