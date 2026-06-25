"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../index");
const createUser = async (req, res) => {
    try {
        const { email, password, role, ...profileData } = req.body;
        // Check if user already exists
        const existingUser = await index_1.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        let createdUser;
        // Start a transaction to ensure both user and profile are created safely
        createdUser = await index_1.prisma.$transaction(async (tx) => {
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
            }
            else if (role === 'FACULTY') {
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
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error while creating user', error: error.message });
    }
};
exports.createUser = createUser;
