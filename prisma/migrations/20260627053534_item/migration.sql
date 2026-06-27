/*
  Warnings:

  - You are about to drop the column `authModule` on the `AccessControll` table. All the data in the column will be lost.
  - You are about to drop the column `tshirtModule` on the `AccessControll` table. All the data in the column will be lost.
  - You are about to drop the `Tshirt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TshirtSize` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TshirtVariant` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `itemModule` to the `AccessControll` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TshirtVariant" DROP CONSTRAINT "TshirtVariant_tshirtId_fkey";

-- AlterTable
ALTER TABLE "AccessControll" DROP COLUMN "authModule",
DROP COLUMN "tshirtModule",
ADD COLUMN     "itemModule" JSONB NOT NULL;

-- DropTable
DROP TABLE "Tshirt";

-- DropTable
DROP TABLE "TshirtSize";

-- DropTable
DROP TABLE "TshirtVariant";

-- CreateTable
CREATE TABLE "ItemSize" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemColorVariant" (
    "id" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemColorVariant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemSizeStock" (
    "id" TEXT NOT NULL,
    "colorVariantId" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ItemSizeStock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemSize_id_key" ON "ItemSize"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ItemSize_size_key" ON "ItemSize"("size");

-- CreateIndex
CREATE UNIQUE INDEX "ItemColorVariant_itemId_color_key" ON "ItemColorVariant"("itemId", "color");

-- CreateIndex
CREATE UNIQUE INDEX "ItemSizeStock_colorVariantId_size_key" ON "ItemSizeStock"("colorVariantId", "size");

-- AddForeignKey
ALTER TABLE "ItemColorVariant" ADD CONSTRAINT "ItemColorVariant_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemSizeStock" ADD CONSTRAINT "ItemSizeStock_colorVariantId_fkey" FOREIGN KEY ("colorVariantId") REFERENCES "ItemColorVariant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
