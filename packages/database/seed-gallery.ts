import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const imageUrls = [
    "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620188467120-5042ed1ce28c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1525169371072-00567c9c0d9c?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550977186-c4582f219a4e?q=80&w=1200&auto=format&fit=crop"
  ];

  for (let i = 0; i < imageUrls.length; i++) {
    const url = imageUrls[i];
    
    // Create Media record
    const media = await prisma.media.create({
      data: {
        url,
        altText: `Zdjęcie z galerii ${i + 1}`,
        mimeType: "image/jpeg",
        sizeBytes: 150000,
      }
    });

    // Create GalleryItem record
    await prisma.galleryItem.create({
      data: {
        imageId: media.id,
        caption: `Zdjęcie treningowe ${i + 1}`,
        albumName: "Treningi",
        eventDate: new Date(),
        publishedAt: new Date()
      }
    });
  }

  console.log("Successfully seeded random gallery images.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
