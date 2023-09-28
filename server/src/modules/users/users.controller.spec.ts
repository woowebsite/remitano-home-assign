import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UnauthorizedException } from '@nestjs/common';
import { UserLoginRegisterResponseDto } from './users.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const UsersServiceProvider = {
      provide: UsersService,
      useValue: {
        loginOrRegister: jest.fn().mockReturnValue({
          isNew: true,
          email: 'wooowebsite@gmail.com',
          token: 'abc',
        }),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, UsersServiceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('loginOrRegister', () => {
    it('should call loginOrRegister method of UsersService and return its result', async () => {
      const user = { email: 'wooowebsite@gmail.com', password: '123456' };
      const expectedResult: UserLoginRegisterResponseDto = {
        isNewUser: true,
        email: 'wooowebsite@gmail.com',
        token: 'abc',
      };
      jest
        .spyOn(usersService, 'loginOrRegister')
        .mockResolvedValue(expectedResult);

      const result = await controller.loginOrRegister(user);

      expect(usersService.loginOrRegister).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getUserProfile', () => {
    it('should return the user profile from the request', () => {
      const user = { id: 1, email: 'wooowebsite@gmail.com' };
      const req = { user };

      const result = controller.getUserProfile(req);

      expect(result).toEqual(user);
    });

    it('should throw UnauthorizedException if user is not found in the request', () => {
      const req = {};

      expect(() => controller.getUserProfile(req)).toThrow(
        UnauthorizedException,
      );
    });
  });
});
