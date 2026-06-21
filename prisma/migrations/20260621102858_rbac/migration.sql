/*
  Warnings:

  - Added the required column `roleId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roleId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "AccessControll" (
    "roleId" TEXT NOT NULL,
    "roleName" TEXT NOT NULL,
    "userModule" JSONB NOT NULL,
    "tshirtModule" JSONB NOT NULL,
    "accessControllModule" JSONB NOT NULL,

    CONSTRAINT "AccessControll_pkey" PRIMARY KEY ("roleId")
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessControll_roleName_key" ON "AccessControll"("roleName");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "AccessControll"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;
