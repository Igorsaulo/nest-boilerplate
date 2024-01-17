import { HttpException, HttpStatus } from "@nestjs/common";

export function HandleException(): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        const result = await originalMethod.apply(this, args);
        return result;
      } catch (error) {
        if (error instanceof Error && error.message) {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        } else {
          throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
    };

    return descriptor;
  };
}
