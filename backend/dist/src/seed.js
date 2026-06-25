"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma = new client_1.PrismaClient();
async function main() {
    const adminPassword = await bcryptjs_1.default.hash('admin123', 10);
    const existingAdmin = await prisma.user.findFirst({
        where: { role: 'ADMIN' },
    });
    if (!existingAdmin) {
        const admin = await prisma.user.create({
            data: {
                email: 'admin@tkrcollege.edu',
                passwordHash: adminPassword,
                role: 'ADMIN',
            },
        });
        console.log(`Admin user created: ${admin.email}`);
    }
    else {
        console.log('Admin user already exists.');
    }
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
