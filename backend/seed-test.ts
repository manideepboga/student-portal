import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);
  
  // Student
  await prisma.user.upsert({
    where: { email: 'student@tkrcollege.edu' },
    update: {},
    create: {
      email: 'student@tkrcollege.edu',
      passwordHash,
      role: 'STUDENT'
    }
  });

  // Staff
  await prisma.user.upsert({
    where: { email: 'staff@tkrcollege.edu' },
    update: {},
    create: {
      email: 'staff@tkrcollege.edu',
      passwordHash,
      role: 'FACULTY'
    }
  });
  
  // Admin
  await prisma.user.upsert({
    where: { email: 'admin@tkrcollege.edu' },
    update: {},
    create: {
      email: 'admin@tkrcollege.edu',
      passwordHash,
      role: 'ADMIN'
    }
  });

  const users = await prisma.user.findMany();
  console.log("Users available:", users.map(u => ({ email: u.email, role: u.role })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
