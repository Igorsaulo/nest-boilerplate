"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const handlePrismaError_1 = require("../utils/handlePrismaError");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        data.password = await this.hashPassword(data.password);
        return this.prisma.user.create({ data });
    }
    async delete(id) {
        return this.prisma.user.delete({
            where: { id },
        });
    }
    async update(id, data) {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }
    async getByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
        });
    }
    async comparePasswords(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(12);
        return bcrypt.hash(password, salt);
    }
};
__decorate([
    (0, handlePrismaError_1.HandlePrismaError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "create", null);
__decorate([
    (0, handlePrismaError_1.HandlePrismaError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "delete", null);
__decorate([
    (0, handlePrismaError_1.HandlePrismaError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "update", null);
__decorate([
    (0, handlePrismaError_1.HandlePrismaError)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserService.prototype, "getByEmail", null);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map