import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create About Us singleton
  const aboutUs = await prisma.aboutUs.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      history: 'Dojo Academy was established to provide top-tier martial arts training with a focus on discipline and character.',
      philosophy: 'Continuous improvement (Kaizen) in mind, body, and spirit.',
    },
  })
  console.log(`Upserted AboutUs section`)

  // Create Contact Info singleton
  const contactInfo = await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      address: '123 Martial Arts Way, Cityville, ST 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@dojoacademy.com',
      hours: 'Mon-Fri: 9 AM - 9 PM\nSat: 10 AM - 4 PM',
    },
  })
  console.log(`Upserted ContactInfo section`)

  // Create a default admin user (Password: admin123)
  // NOTE: In production, password should be hashed (e.g. using bcrypt). We'll seed it directly here for testing.
  const admin = await prisma.adminUser.upsert({
    where: { email: 'admin@dojoacademy.com' },
    update: {},
    create: {
      email: 'admin@dojoacademy.com',
      passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // bcrypt hash for 'password'
      role: 'admin',
    },
  })
  console.log(`Upserted AdminUser`)

  // Seed sample news posts
  const news1 = await prisma.newsPost.upsert({
    where: { slug: 'summer-training-camp' },
    update: {},
    create: {
      title: 'Summer Training Camp',
      slug: 'summer-training-camp',
      excerpt: 'Join us for an intensive 2-week training camp this summer.',
      body: 'This summer, Dojo Academy is hosting an intensive 2-week training camp. Perfect for all skill levels wanting to take their training to the next level. We will cover advanced techniques, sparring strategies, and physical conditioning.',
      publishedAt: new Date(),
    },
  })
  console.log(`Upserted NewsPost: ${news1.title}`)

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
