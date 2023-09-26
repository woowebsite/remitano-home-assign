import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../jwt/jwt.service';
import { UserLoginRegisterRequestDto } from './users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login-register')
  loginOrRegister(@Body() user: UserLoginRegisterRequestDto) {
    return this.usersService.loginOrRegister(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req: any) {
    const { user } = req;

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
