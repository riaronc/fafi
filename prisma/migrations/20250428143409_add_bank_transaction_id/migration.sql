/*
  Warnings:

  - A unique constraint covering the columns `[bankTransactionId]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "transactions" ADD COLUMN "bankTransactionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "transactions_bankTransactionId_key" ON "transactions"("bankTransactionId");
