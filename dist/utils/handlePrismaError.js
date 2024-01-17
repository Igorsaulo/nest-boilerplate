"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandlePrismaError = void 0;
const common_1 = require("@nestjs/common");
function HandlePrismaError() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            try {
                const result = await originalMethod.apply(this, args);
                return result;
            }
            catch (error) {
                if (error.code === 'P2025') {
                    throw new common_1.NotFoundException(error.message);
                }
                else if (error.code === 'P2002') {
                    throw new common_1.ConflictException(error.message);
                }
                else {
                    throw new Error(error.message);
                }
            }
        };
        return descriptor;
    };
}
exports.HandlePrismaError = HandlePrismaError;
//# sourceMappingURL=handlePrismaError.js.map