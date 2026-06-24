import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.findUnique({
    where: { email: 'mani@tkrcollege.edu' }
  });

  if (!user) throw new Error("User not found");

  await prisma.student.upsert({
    where: { userId: user.id },
    update: {
      firstName: 'Manideep',
      lastName: 'Boga',
      rollNumber: '23K91A0540',
      branch: 'Computer Science and Engineering',
      section: 'CSE-A',
      academicYear: 4
    },
    create: {
      userId: user.id,
      firstName: 'Manideep',
      lastName: 'Boga',
      rollNumber: '23K91A0540',
      branch: 'Computer Science and Engineering',
      section: 'CSE-A',
      academicYear: 4
    }
  });

  console.log("Successfully updated to mani@tkrcollege.edu and created profile.");
}

main().catch(console.error).finally(() => prisma.$disconnect());
