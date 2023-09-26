import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { MongoRepository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import {
  UserLoginRegisterRequestDto,
  UserLoginRegisterResponseDto,
} from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async loginOrRegister(
    user: UserLoginRegisterRequestDto,
  ): Promise<UserLoginRegisterResponseDto> {
    const { email, password } = user;

    if (!email || !password) {
      throw new BadRequestException(`Email/password is required.`);
    }

    const userData = await this.findByEmail(email);

    const data: UserLoginRegisterResponseDto = {
      isNewUser: false,
      email: '',
      token: '',
    };

    if (userData) {
      if (await bcrypt.compare(password, userData.password)) {
        data.isNewUser = false;
        data.email = userData.email;
      } else {
        throw new BadRequestException(`Wrong user or password`);
      }
    } else {
      const entity = Object.assign(new User(), user);
      const newUser = await this.userRepository.save(entity);
      data.isNewUser = true;
      data.email = newUser.email;
    }

    const token = this.jwtService.sign({ email: user.email });
    return { ...data, token };
  }

  findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }
}
