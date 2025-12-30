-- DropIndex
DROP INDEX "RefreshToken_userId_key";

-- AlterTable
ALTER TABLE "RefreshToken" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id");
