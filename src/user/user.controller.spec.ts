import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from '@prisma/client';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let prismaService: PrismaService;

  //crie um usuário para ser usado nos testes
  const user: User = {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        PrismaService,
        {
          provide: JwtService,
          useValue: {},
        },
      ],
      imports: [PrismaModule],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a user', async () => {
      // Arrange
      jest.spyOn(userService, 'create').mockResolvedValue(user);

      // Act
      const result = await userController.create(user);

      // Assert
      expect(result).toEqual(user);
    });

    it('should throw an error if the user already exists', async () => {
      // Arrange
      jest.spyOn(userService, 'create').mockRejectedValue({ code: 'P2002' });

      // Act
      const result = userController.create(user);

      // Assert
      await expect(result).rejects.toThrowError(HttpException);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      // Arrange
      jest.spyOn(userService, 'delete').mockResolvedValue(user);

      // Act
      const result = await userController.delete(user.id);

      // Assert
      expect(result).toEqual(user);
    });

    it('should throw an error if the user does not exist', async () => {
      // Arrange
      jest.spyOn(userService, 'delete').mockRejectedValue(null);

      // Act
      const result = userController.delete(user.id);

      // Assert
      await expect(result).rejects.toThrowError(HttpException);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      jest.spyOn(userService, 'update').mockResolvedValue(user);

      // Act
      const result = await userController.update(user.id, user);

      // Assert
      expect(result).toEqual(user);
    });

    it('should throw an error if the user does not exist', async () => {
      // Arrange
      jest.spyOn(userService, 'update').mockRejectedValue(null);

      // Act
      const result = userController.update(user.id, user);

      // Assert
      await expect(result).rejects.toThrowError(HttpException);
    });
  });
});
