import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate(payload: User) {
    const { email } = payload;

    if (email) {
      const user = await this.usersService.findByEmail(email);
      if (user) return user.safeResponse();
    }

    throw new UnauthorizedException();
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
