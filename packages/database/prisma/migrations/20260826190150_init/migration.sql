-- CreateEnum
CREATE TYPE "AchievementCategory" AS ENUM ('Regional', 'National', 'International', 'Other');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('new', 'reviewed', 'spam');

-- CreateTable
CREATE TABLE "media" (
    "id" BIGSERIAL NOT NULL,
    "url" VARCHAR(500) NOT NULL,
    "alt_text" VARCHAR(255) NOT NULL,
    "mime_type" VARCHAR(100) NOT NULL,
    "size_bytes" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news_posts" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(220) NOT NULL,
    "excerpt" VARCHAR(500),
    "body" TEXT NOT NULL,
    "featured_image_id" BIGINT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "news_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_items" (
    "id" BIGSERIAL NOT NULL,
    "caption" VARCHAR(300),
    "album_name" VARCHAR(150),
    "event_date" DATE,
    "image_id" BIGINT NOT NULL,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "achievements" (
    "id" BIGSERIAL NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "slug" VARCHAR(220) NOT NULL,
    "description" TEXT,
    "category" "AchievementCategory",
    "achieved_at" DATE NOT NULL,
    "image_id" BIGINT,
    "published_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "achievements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "about_us" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "history" TEXT,
    "philosophy" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "about_us_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor_bios" (
    "id" BIGSERIAL NOT NULL,
    "about_us_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "bio_text" TEXT,
    "photo_id" BIGINT,
    "display_order" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "instructor_bios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_info" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "address" VARCHAR(300) NOT NULL,
    "phone" VARCHAR(30) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "hours" TEXT,
    "map_lat" DECIMAL(9,6),
    "map_lng" DECIMAL(9,6),
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "site_settings" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "dojo_name" VARCHAR(150) NOT NULL,
    "tagline" VARCHAR(255),
    "logo_id" BIGINT,
    "hero_image_id" BIGINT,
    "social_links" JSONB,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "message" TEXT NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'new',
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin_users" (
    "id" BIGSERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(20) NOT NULL DEFAULT 'admin',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "news_posts_slug_key" ON "news_posts"("slug");

-- CreateIndex
CREATE INDEX "news_posts_published_at_idx" ON "news_posts"("published_at" DESC);

-- CreateIndex
CREATE INDEX "gallery_items_published_at_idx" ON "gallery_items"("published_at" DESC);

-- CreateIndex
CREATE INDEX "gallery_items_album_name_idx" ON "gallery_items"("album_name");

-- CreateIndex
CREATE UNIQUE INDEX "achievements_slug_key" ON "achievements"("slug");

-- CreateIndex
CREATE INDEX "achievements_published_at_idx" ON "achievements"("published_at" DESC);

-- CreateIndex
CREATE INDEX "achievements_category_idx" ON "achievements"("category");

-- CreateIndex
CREATE INDEX "instructor_bios_about_us_id_display_order_idx" ON "instructor_bios"("about_us_id", "display_order");

-- CreateIndex
CREATE INDEX "contact_submissions_status_submitted_at_idx" ON "contact_submissions"("status", "submitted_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- AddForeignKey
ALTER TABLE "news_posts" ADD CONSTRAINT "news_posts_featured_image_id_fkey" FOREIGN KEY ("featured_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gallery_items" ADD CONSTRAINT "gallery_items_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "achievements" ADD CONSTRAINT "achievements_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_bios" ADD CONSTRAINT "instructor_bios_about_us_id_fkey" FOREIGN KEY ("about_us_id") REFERENCES "about_us"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_bios" ADD CONSTRAINT "instructor_bios_photo_id_fkey" FOREIGN KEY ("photo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_fkey" FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_hero_image_id_fkey" FOREIGN KEY ("hero_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
