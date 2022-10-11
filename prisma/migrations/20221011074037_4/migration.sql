-- AlterTable
ALTER TABLE `product` ADD COLUMN `brandsId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_brandsId_fkey` FOREIGN KEY (`brandsId`) REFERENCES `Brands`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
