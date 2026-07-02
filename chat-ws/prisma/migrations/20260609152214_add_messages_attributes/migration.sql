-- CreateEnum
CREATE TYPE "MessageStatus" AS ENUM ('PENDING', 'SENT', 'RECEIVED', 'READ');

-- CreateEnum
CREATE TYPE "MessageType" AS ENUM ('TEXT');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "status" "MessageStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "type" "MessageType" NOT NULL DEFAULT 'TEXT';
