/*
  Warnings:

  - You are about to drop the column `account_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `bank_account_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "transactions" DROP CONSTRAINT "transactions_account_id_fkey";

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "account_id",
ADD COLUMN     "bank_account_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
