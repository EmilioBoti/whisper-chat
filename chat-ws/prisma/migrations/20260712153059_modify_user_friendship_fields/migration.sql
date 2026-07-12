/*
  Warnings:

  - The values [SENT] on the enum `FriendShipStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `type` on the `UserFriendNotification` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[notiKey]` on the table `UserFriendNotification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `notiKey` to the `UserFriendNotification` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `UserFriendNotification` required. This step will fail if there are existing NULL values in that column.
  - Made the column `friendsKey` on table `UserFriendShip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendShipStatus_new" AS ENUM ('PENDING', 'ACCAPTED', 'REJECTED');
ALTER TABLE "UserFriendNotification" ALTER COLUMN "status" TYPE "FriendShipStatus_new" USING ("status"::text::"FriendShipStatus_new");
ALTER TYPE "FriendShipStatus" RENAME TO "FriendShipStatus_old";
ALTER TYPE "FriendShipStatus_new" RENAME TO "FriendShipStatus";
DROP TYPE "public"."FriendShipStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "UserFriendNotification" DROP COLUMN "type",
ADD COLUMN     "notiKey" TEXT NOT NULL,
ALTER COLUMN "status" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserFriendShip" ALTER COLUMN "friendsKey" SET NOT NULL;

-- DropEnum
DROP TYPE "NotificationType";

-- CreateIndex
CREATE UNIQUE INDEX "UserFriendNotification_notiKey_key" ON "UserFriendNotification"("notiKey");
