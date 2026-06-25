"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
dotenv_1.default.config();
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'TKR College Portal API is running' });
});
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
// Import routes (to be added)
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', user_routes_1.default);
// app.use('/api/student', studentRoutes);
// app.use('/api/faculty', facultyRoutes);
// app.use('/api/admin', adminRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
