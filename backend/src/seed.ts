import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // Create Student
  const studentUser = await prisma.user.upsert({
    where: { email: 'mani@tkrcollege.edu' },
    update: {},
    create: {
      email: 'mani@tkrcollege.edu',
      passwordHash,
      role: 'STUDENT',
    },
  });

  // Create Student Profile
  await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      rollNumber: '20K91A0501',
      firstName: 'Mani',
      lastName: 'Deep',
      branch: 'CSE',
      section: 'A',
      academicYear: 4
    }
  });

  // Create Staff
  const staffUser = await prisma.user.upsert({
    where: { email: 'staff@tkrcollege.edu' },
    update: {},
    create: {
      email: 'staff@tkrcollege.edu',
      passwordHash,
      role: 'FACULTY',
    },
  });

  // Create Admin
  await prisma.user.upsert({
    where: { email: 'admin@tkrcollege.edu' },
    update: {},
    create: {
      email: 'admin@tkrcollege.edu',
      passwordHash,
      role: 'ADMIN',
    },
  });

  console.log("Database seeded successfully with default users.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
