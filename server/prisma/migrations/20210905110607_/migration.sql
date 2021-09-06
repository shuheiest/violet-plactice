/*
  Warnings:

  - Added the required column `foldername` to the `Childfolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Childfolder` ADD COLUMN `foldername` VARCHAR(191) NOT NULL;
