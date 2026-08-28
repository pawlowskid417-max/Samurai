import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create About Us singleton
  const aboutUs = await prisma.aboutUs.upsert({
    where: { id: 1 },
    update: {},
    create: {
      history: 'Klub Samuraj Lubań powstał z przekonania, że dyscyplina kształtuje charakter. Od lat uczymy tradycyjnych sztuk walki — karate, judo i ju-jitsu — dbając o to, by każdy trening odbywał się w atmosferze skupienia i wzajemnego szacunku. Nasze zajęcia są dostosowane do wszystkich poziomów zaawansowania — od pierwszych kroków na macie po starty w zawodach ogólnopolskich.\n\nTo, co zaczęło się jako niewielka grupa treningowa w Lubaniu, z czasem przerodziło się w prężnie działający klub, w którym setki zawodniczek i zawodników odkryły nie tylko techniki walki, ale też sposób na życie oparty na wytrwałości i szacunku.',
      philosophy: 'Wierzymy w zasadę kaizen — ciągłego doskonalenia się. Trening to nie tylko rozwój fizyczny, ale też hart ducha, szacunek i pokora. Każdy ukłon przed wejściem na matę przypomina, że wchodzimy tam, by się uczyć, a schodzimy z niej trochę lepsi niż wcześniej.',
    },
  })
  console.log(`Upserted AboutUs section`)

  // Create Contact Info singleton
  const contactInfo = await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      address: 'ul. Sportowa 1, 59-800 Lubań',
      phone: '+48 500 100 200',
      email: 'kontakt@samuraj-luban.pl',
      hours: 'Pon-Pt: 16:00 - 20:00\nSobota: Treningi sekcji wyczynowej',
    },
  })
  console.log(`Upserted ContactInfo section`)

  // Create a default admin user (Password: admin123)
  // NOTE: In production, password should be hashed (e.g. using bcrypt). We'll seed it directly here for testing.
  const admin = await prisma.adminUser.upsert({
    where: { email: 'trener@samuraj-luban.pl' },
    update: {},
    create: {
      email: 'trener@samuraj-luban.pl',
      passwordHash: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // bcrypt hash for 'password'
      role: 'admin',
    },
  })
  console.log(`Upserted AdminUser`)

  // Seed sample news posts
  const news1 = await prisma.newsPost.upsert({
    where: { slug: 'letni-oboz-szkoleniowy' },
    update: {},
    create: {
      title: 'Letni Obóz Szkoleniowy',
      slug: 'letni-oboz-szkoleniowy',
      excerpt: 'Dołącz do nas na intensywny dwutygodniowy obóz treningowy w te wakacje.',
      body: 'Tego lata Samuraj Lubań organizuje intensywny dwutygodniowy obóz treningowy. Idealny dla wszystkich poziomów zaawansowania. Skupimy się na zaawansowanych technikach, sparingach oraz przygotowaniu kondycyjnym.',
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
