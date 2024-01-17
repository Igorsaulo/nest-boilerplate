import { NotFoundException, ConflictException } from '@nestjs/common';

export function HandlePrismaError() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        if (error.code === 'P2025') {
          throw new NotFoundException(error.message);
        } else if (error.code === 'P2002') {
          throw new ConflictException(error.message);
        } else {
          throw new Error(error.message);
        }
      }
    };

    return descriptor;
  };
}
