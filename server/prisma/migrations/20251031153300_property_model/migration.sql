-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('active', 'inactive');

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
