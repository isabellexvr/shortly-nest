-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "urls" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortenedUrl" TEXT NOT NULL,
    "visitsCounter" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
