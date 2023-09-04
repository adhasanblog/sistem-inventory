/*
  Warnings:

  - You are about to drop the column `product_name` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[product_code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[product_type]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Product_type_key` ON `product`;

-- AlterTable
ALTER TABLE `product` DROP COLUMN `product_name`,
    DROP COLUMN `type`,
    ADD COLUMN `product_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_type` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Transaction` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `serial_number` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `transaction_type` ENUM('IN', 'OUT') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_code_key` ON `Product`(`product_code`);

-- CreateIndex
CREATE UNIQUE INDEX `Product_product_type_key` ON `Product`(`product_type`);

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `Transaction_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
