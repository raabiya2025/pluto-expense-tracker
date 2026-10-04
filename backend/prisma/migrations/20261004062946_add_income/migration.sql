-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "source" VARCHAR(100) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
