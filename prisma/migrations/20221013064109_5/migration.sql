-- CreateTable
CREATE TABLE `_CategoriesToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_CategoriesToProduct_AB_unique`(`A`, `B`),
    INDEX `_CategoriesToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD CONSTRAINT `_CategoriesToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CategoriesToProduct` ADD CONSTRAINT `_CategoriesToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
