/*
  Warnings:

  - You are about to drop the column `UserId` on the `WorkspaceMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,workspaceId]` on the table `WorkspaceMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `WorkspaceMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_UserId_fkey";

-- DropIndex
DROP INDEX "WorkspaceMember_UserId_workspaceId_key";

-- AlterTable
ALTER TABLE "WorkspaceMember" DROP COLUMN "UserId",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "WorkspaceMember_userId_workspaceId_key" ON "WorkspaceMember"("userId", "workspaceId");

-- AddForeignKey
ALTER TABLE "WorkspaceMember" ADD CONSTRAINT "WorkspaceMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
