/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `Category` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `deliveryFee` on the `Restaurant` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "restaurantId";

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "price" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "deliveryFee" SET DATA TYPE DECIMAL(10,2);
