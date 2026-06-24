import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../index';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role, ...profileData } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let createdUser;

    // Start a transaction to ensure both user and profile are created safely
    createdUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          role,
        },
      });

      if (role === 'STUDENT') {
        const { firstName, lastName, rollNumber, branch, section, academicYear } = profileData;
        await tx.student.create({
          data: {
            userId: user.id,
            firstName,
            lastName,
            rollNumber,
            branch,
            section,
            academicYear: parseInt(academicYear) || 1,
          },
        });
      } else if (role === 'FACULTY') {
        const { firstName, lastName, facultyId } = profileData;
        
        // Ensure a default department exists
        let department = await tx.department.findFirst({
          where: { code: 'CSE' }
        });
        
        if (!department) {
          department = await tx.department.create({
            data: {
              name: 'Computer Science and Engineering',
              code: 'CSE'
            }
          });
        }

        await tx.faculty.create({
          data: {
            userId: user.id,
            firstName,
            lastName,
            facultyId,
            departmentId: department.id,
          },
        });
      }

      return user;
    });

    res.status(201).json({ message: 'User created successfully', user: { id: createdUser.id, email: createdUser.email, role: createdUser.role } });
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error while creating user', error: error.message });
  }
};
