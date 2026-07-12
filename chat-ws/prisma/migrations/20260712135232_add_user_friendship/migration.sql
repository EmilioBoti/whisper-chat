-- CreateEnum
CREATE TYPE "FriendShipStatus" AS ENUM ('SENT', 'PENDING', 'ACCAPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('FRIEND_SHIP');

-- DropIndex
DROP INDEX "Profile_id_idx";

-- CreateTable
CREATE TABLE "UserFriendNotification" (
    "id" SERIAL NOT NULL,
    "senserId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "status" "FriendShipStatus",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserFriendNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFriendShip" (
    "id" SERIAL NOT NULL,
    "userIdA" TEXT NOT NULL,
    "userIdB" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "friendsKey" TEXT,

    CONSTRAINT "UserFriendShip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserFriendNotification_senserId_idx" ON "UserFriendNotification"("senserId");

-- CreateIndex
CREATE INDEX "UserFriendNotification_receiverId_idx" ON "UserFriendNotification"("receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "UserFriendShip_friendsKey_key" ON "UserFriendShip"("friendsKey");

-- CreateIndex
CREATE INDEX "UserFriendShip_userIdB_idx" ON "UserFriendShip"("userIdB");

-- CreateIndex
CREATE UNIQUE INDEX "UserFriendShip_userIdA_userIdB_key" ON "UserFriendShip"("userIdA", "userIdB");

-- AddForeignKey
ALTER TABLE "UserFriendNotification" ADD CONSTRAINT "UserFriendNotification_senserId_fkey" FOREIGN KEY ("senserId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriendNotification" ADD CONSTRAINT "UserFriendNotification_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriendShip" ADD CONSTRAINT "UserFriendShip_userIdA_fkey" FOREIGN KEY ("userIdA") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFriendShip" ADD CONSTRAINT "UserFriendShip_userIdB_fkey" FOREIGN KEY ("userIdB") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
