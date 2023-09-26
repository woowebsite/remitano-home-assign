import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly mongodbConfig = {};
  private readonly typeormConfig = {};

  constructor(private configService: ConfigService) {
    this.mongodbConfig = this.configService.get('mongodb');
    this.typeormConfig = this.configService.get('typeorm');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      ...this.mongodbConfig,
      ...this.typeormConfig,
      autoLoadEntities: true,
    };
  }
}
