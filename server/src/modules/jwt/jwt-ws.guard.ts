import { CanActivate, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: any): Promise<boolean> {
    try {
      const bearerToken =
        context.args[0].handshake.headers?.authorization.split(' ')[1];
      const accessTokenSecret = this.configService.get<string>(
        'jwt.accessTokenSecret',
      );
      const decoded = jwt.verify(bearerToken, accessTokenSecret) as any;
      const user = await this.userService.findByEmail(decoded.email);
      context.args[0].handshake.user = user;
      return user ? true : false;
    } catch (ex) {
      return false;
    }
  }
}
