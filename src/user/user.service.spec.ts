import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let prismaService: PrismaService;

    const user: User = {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password',
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserService, PrismaService],
        }).compile();

        service = module.get<UserService>(UserService);
        prismaService = module.get<PrismaService>(PrismaService);
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('create', () => {
        it('should create a user', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);

            // Act
            const result = await service.create(user);

            // Assert
            expect(result).toEqual(user);
        });

        it('should throw an error if the user already exists', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'create').mockRejectedValue({ code: 'P2002' });

            // Act
            const result = service.create(user);

            // Assert
            await expect(result).rejects.toThrowError(ConflictException);
        });
    });

    describe('delete', () => {
        it('should delete a user', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'delete').mockResolvedValue(user);

            // Act
            const result = await service.delete(user.id);

            // Assert
            expect(result).toEqual(user);
        });

        it('should throw an error if the user does not exist', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'delete').mockRejectedValue({ code: 'P2025' });

            // Act
            const result = service.delete(user.id);

            // Assert
            await expect(result).rejects.toThrowError(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'update').mockResolvedValue(user);

            // Act
            const result = await service.update(user.id, user);

            // Assert
            expect(result).toEqual(user);
        });

        it('should throw an error if the user does not exist', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'update').mockRejectedValue({ code: 'P2025' });

            // Act
            const result = service.update(user.id, user);

            // Assert
            await expect(result).rejects.toThrowError(NotFoundException);
        });
    });

    describe('getByEmail', () => {
        it('should find a user by email', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);

            // Act
            const result = await service.getByEmail(user.email);

            // Assert
            expect(result).toEqual(user);
        });

        it('should throw an error if the user does not exist', async () => {
            // Arrange
            jest.spyOn(prismaService.user, 'findUnique').mockRejectedValue({ code: 'P2025' });

            // Act
            const result = service.getByEmail(user.email);

            // Assert
            await expect(result).rejects.toThrowError(NotFoundException);
        });
    });

});