import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient()

const main = async () => {
  const password = "changeme"

  const hashedPassword = await bcrypt.hash(password, 10)
  await prisma.user.upsert({
    where: { email: "admin@test.test" },
    update: {},
    create: {
      email: "admin@test.test",
      password: hashedPassword,
      role: "ADMIN",
    }
  })

  await prisma.user.upsert({
    where: { email: "staff@test.test" },
    update: {},
    create: {
      email: "staff@test.test",
      password: hashedPassword,
      role: "STAFF",
    }
  })

  const touristUser = await prisma.user.upsert({
    where: { email: "tourist@test.test" },
    update: {},
    create: {
      email: "tourist@test.test",
      password: hashedPassword,
      role: "TOURIST",
    }
  })
  
  const tour = await prisma.tour.create({
    data: {
      name: "Paris Tour",
      description: "A wonderful tour in Paris",
      price: 100,
      duration: 3,
    },
  })

  await prisma.tourist.upsert({
    where: { userId: touristUser.id },
    update: {},
    create: {
      userId: touristUser.id,
      firstName: "John",
      lastName: "Doe",
      address: "123 Main St, City, Country",
      trips: {
        create: [
          {
            startDate: new Date(),
            endDate: new Date(),
            destination: "Paris",
            notes: "Excited for this trip!",
            tour: {
              connect: { id: tour.id },
            },
          },
        ],
      },
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e: any) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
