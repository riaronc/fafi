/*
  Warnings:

  - You are about to drop the column `actualAmount` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `period` on the `budgets` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `budgets` table. All the data in the column will be lost.
  - Added the required column `month` to the `budgets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `budgets` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_budgets" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "plannedAmount" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "categoryId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "budgets_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "budgets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_budgets" ("categoryId", "createdAt", "id", "name", "plannedAmount", "updatedAt", "userId") SELECT "categoryId", "createdAt", "id", "name", "plannedAmount", "updatedAt", "userId" FROM "budgets";
DROP TABLE "budgets";
ALTER TABLE "new_budgets" RENAME TO "budgets";
CREATE UNIQUE INDEX "budgets_userId_categoryId_year_month_key" ON "budgets"("userId", "categoryId", "year", "month");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
