/*
  Warnings:

  - The values [ACCAPTED] on the enum `FriendShipStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FriendShipStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
ALTER TABLE "public"."UserFriendNotification" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "UserFriendNotification" ALTER COLUMN "status" TYPE "FriendShipStatus_new" USING ("status"::text::"FriendShipStatus_new");
ALTER TYPE "FriendShipStatus" RENAME TO "FriendShipStatus_old";
ALTER TYPE "FriendShipStatus_new" RENAME TO "FriendShipStatus";
DROP TYPE "public"."FriendShipStatus_old";
ALTER TABLE "UserFriendNotification" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
