/*
  Warnings:

  - You are about to drop the column `userA` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `userB` on the `Chat` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Message_chatId_idx";

-- DropIndex
DROP INDEX "Message_senderId_idx";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "userA",
DROP COLUMN "userB";

-- CreateIndex
CREATE INDEX "Message_chatId_senderId_idx" ON "Message"("chatId", "senderId");
