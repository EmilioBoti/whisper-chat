/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "email" TEXT NULL;

UPDATE "Profile" SET "email" = id WHERE "email" IS NULL;

ALTER TABLE "Profile" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserFriendNotification" ALTER COLUMN "status" SET DEFAULT 'PENDING';

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");
