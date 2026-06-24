import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'student@tkrcollege.edu';
  const password = 'password123';
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.log("User not found!");
    return;
  }
  
  console.log("Found user:", user.email, "Role:", user.role);
  console.log("Password hash in DB:", user.passwordHash);
  
  const isValid = await bcrypt.compare(password, user.passwordHash);
  console.log("Password is valid?", isValid);
}

main().catch(console.error).finally(() => prisma.$disconnect());
