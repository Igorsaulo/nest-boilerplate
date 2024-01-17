"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleException = void 0;
const common_1 = require("@nestjs/common");
function HandleException() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            try {
                const result = await originalMethod.apply(this, args);
                return result;
            }
            catch (error) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
            }
        };
        return descriptor;
    };
}
exports.HandleException = HandleException;
//# sourceMappingURL=handleException.js.map