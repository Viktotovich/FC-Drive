-- CreateTable
CREATE TABLE "AllowedRoute" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "fileId" TEXT,

    CONSTRAINT "AllowedRoute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AllowedRoute" ADD CONSTRAINT "AllowedRoute_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
