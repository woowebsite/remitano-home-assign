import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongoRepository } from 'typeorm';
import { UsersService } from './users.service';
import {
  UserLoginRegisterRequestDto,
  UserLoginRegisterResponseDto,
} from './users.dto';

import { User } from './users.entity';

import * as bcrypt from 'bcrypt';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: MongoRepository<User>;
  let jwtService: JwtService;
  let bcryptCompareMock;

  beforeEach(() => {
    userRepository = {} as MongoRepository<User>;
    jwtService = {} as JwtService;
    usersService = new UsersService(userRepository, jwtService);
    bcryptCompareMock = jest.fn();
    (bcrypt.compare as jest.Mock) = bcryptCompareMock;
  });

  describe('loginOrRegister', () => {
    it('should throw an HttpException with status 400 if email or password is missing', async () => {
      const user: UserLoginRegisterRequestDto = {
        email: '', // Missing email
        password: 'password',
      };

      await expect(usersService.loginOrRegister(user)).rejects.toThrowError(
        HttpException,
      );
      await expect(usersService.loginOrRegister(user)).rejects.toMatchObject({
        status: 400,
        message: 'Email/password is required.',
      });
    });

    it('should throw an HttpException with status 400 if user input is wrong password', async () => {
      const user: UserLoginRegisterRequestDto = {
        email: 'test@example.com',
        password: 'wrong-password', // Invalid password
      };

      usersService.findByEmail = jest.fn().mockResolvedValue(user);
      bcryptCompareMock.mockResolvedValue(false);

      await expect(usersService.loginOrRegister(user)).rejects.toThrowError(
        HttpException,
      );
      await expect(usersService.loginOrRegister(user)).rejects.toMatchObject({
        status: 400,
        message: 'Wrong user or password',
      });
    });

    it('should register a new user and return the user data and token', async () => {
      const newUser: UserLoginRegisterRequestDto = {
        email: 'new@example.com',
        password: 'password', // Invalid password
      };
      userRepository.findOne = jest.fn().mockResolvedValue(null);
      userRepository.save = jest.fn().mockResolvedValue(newUser);
      jwtService.sign = jest.fn().mockReturnValue('token');

      const result: UserLoginRegisterResponseDto =
        await usersService.loginOrRegister(newUser);

      expect(result).toMatchObject({
        isNewUser: true,
        email: 'new@example.com',
        token: 'token',
      });
    });

    it('should log in an existing user and return the user data and token', async () => {
      const user: UserLoginRegisterRequestDto = {
        email: 'test@example.com',
        password: 'password', // Invalid password
      };

      usersService.findByEmail = jest.fn().mockResolvedValue(user);
      bcryptCompareMock.mockResolvedValue(true);
      jwtService.sign = jest.fn().mockReturnValue('token');

      const result: UserLoginRegisterResponseDto =
        await usersService.loginOrRegister(user);

      expect(result).toMatchObject({
        isNewUser: false,
        email: 'test@example.com',
        token: 'token',
      });
    });
  });
});
