-- CreateTable
CREATE TABLE "TshirtSize" (
    "id" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TshirtSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tshirt" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tshirt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TshirtVariant" (
    "id" TEXT NOT NULL,
    "tshirtId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "images" TEXT NOT NULL,
    "isAvailable" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TshirtVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TshirtSize_id_key" ON "TshirtSize"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TshirtSize_size_key" ON "TshirtSize"("size");

-- CreateIndex
CREATE UNIQUE INDEX "TshirtVariant_tshirtId_color_size_key" ON "TshirtVariant"("tshirtId", "color", "size");

-- AddForeignKey
ALTER TABLE "TshirtVariant" ADD CONSTRAINT "TshirtVariant_tshirtId_fkey" FOREIGN KEY ("tshirtId") REFERENCES "Tshirt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
