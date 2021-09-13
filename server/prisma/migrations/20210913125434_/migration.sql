/*
  Warnings:

  - Added the required column `rootflg` to the `Parentfolder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Parentfolder` ADD COLUMN `rootflg` BOOLEAN NOT NULL;
