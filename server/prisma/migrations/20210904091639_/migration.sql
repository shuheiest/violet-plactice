/*
  Warnings:

  - You are about to drop the `Filetree` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Filetree`;

-- CreateTable
CREATE TABLE `Parentfolder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `foldername` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Childfolder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `folderid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `filename` VARCHAR(191) NOT NULL,
    `folderid` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
