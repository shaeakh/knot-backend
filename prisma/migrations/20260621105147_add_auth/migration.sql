/*
  Warnings:

  - Added the required column `authModule` to the `AccessControll` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AccessControll" ADD COLUMN     "authModule" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roleId" SET DEFAULT 'f9e74c8b-5a12-4c6e-8d9e-1a2b3c4d5e6f';
