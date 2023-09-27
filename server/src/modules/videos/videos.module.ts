import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './videos.entity';
import { HttpModule } from '@nestjs/axios';
import { Server } from 'socket.io';

@Module({
  imports: [TypeOrmModule.forFeature([Video]), HttpModule],
  controllers: [VideosController],
  providers: [VideosService, Server],
})
export class VideosModule {}
