-- CreateTable
CREATE TABLE "ItemTracking" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "progressiveId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemTracking_pkey" PRIMARY KEY ("id")
);
