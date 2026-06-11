-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "shortName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "nativeName" TEXT,
    "gender" TEXT,
    "nationality" TEXT,
    "birthDate" TIMESTAMP(3),
    "birthPlace" TEXT,
    "heightCm" INTEGER,
    "weightKg" INTEGER,
    "spikeReachCm" INTEGER,
    "blockReachCm" INTEGER,
    "dominantHand" TEXT,
    "position" TEXT,
    "secondaryPosition" TEXT,
    "jerseyNumber" INTEGER,
    "status" TEXT,
    "profileImage" TEXT,
    "coverImage" TEXT,
    "biography" TEXT,
    "professionalDebutYear" INTEGER,
    "majorAchievements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdated" TIMESTAMP(3),
    "currentClubId" TEXT,
    "currentNationalTeamId" TEXT,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "nickname" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "teamType" TEXT,
    "founded" INTEGER,
    "owner" TEXT,
    "coach" TEXT,
    "captain" TEXT,
    "homeArena" TEXT,
    "league" TEXT,
    "website" TEXT,
    "logo" TEXT,
    "description" TEXT,
    "colors" TEXT[],
    "status" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_playerId_key" ON "Player"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_slug_key" ON "Player"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Team_teamId_key" ON "Team"("teamId");

-- CreateIndex
CREATE UNIQUE INDEX "Team_slug_key" ON "Team"("slug");
