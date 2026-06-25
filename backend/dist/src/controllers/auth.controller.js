"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await index_1.prisma.user.findUnique({
            where: { email },
            include: {
                studentProfile: true,
                facultyProfile: true,
            }
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValid = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                studentProfile: user.studentProfile,
                facultyProfile: user.facultyProfile,
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.login = login;
const getMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                studentProfile: true,
                facultyProfile: true,
            }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({
            id: user.id,
            email: user.email,
            role: user.role,
            studentProfile: user.studentProfile,
            facultyProfile: user.facultyProfile,
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getMe = getMe;
