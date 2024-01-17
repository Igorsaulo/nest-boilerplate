import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: User): Promise<User>;
    delete(id: number): Promise<User>;
    update(id: number, data: User): Promise<User>;
    getByEmail(email: string): Promise<User>;
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>;
    private hashPassword;
}
