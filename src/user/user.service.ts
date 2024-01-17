import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { HandlePrismaError } from '../utils/handlePrismaError';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  @HandlePrismaError()
  async create(data: User): Promise<User> {
    data.password = await this.hashPassword(data.password);
    return this.prisma.user.create({ data });
  }

  @HandlePrismaError()
  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  @HandlePrismaError()
  async update(id: number, data: User): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  @HandlePrismaError()
  async getByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12);
    return bcrypt.hash(password, salt);
  }
}
