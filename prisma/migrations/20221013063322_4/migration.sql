/*
  Warnings:

  - You are about to drop the `categoriesonproducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoriesonproducts` DROP FOREIGN KEY `CategoriesOnProducts_categoriesId_fkey`;

-- DropForeignKey
ALTER TABLE `categoriesonproducts` DROP FOREIGN KEY `CategoriesOnProducts_productId_fkey`;

-- DropTable
DROP TABLE `categoriesonproducts`;
