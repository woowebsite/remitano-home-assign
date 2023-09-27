import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './videos.entity';
import { MongoRepository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { CreatedByDto } from './videos.dto';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private readonly videoRepository: MongoRepository<Video>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async create(sharedLink: string, user: CreatedByDto): Promise<Video> {
    const youtubeId = this.extractYouTubeId(sharedLink);

    if (!youtubeId) {
      throw new HttpException(
        'Shared link is invalid.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existsVideo = await this.getVideoByYoutubeId(youtubeId);

    if (existsVideo) {
      throw new HttpException(
        'This video has been shared.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const videoInfo = await this.getVideoInfoById(youtubeId);

    const { title, description }: any = videoInfo?.items?.[0]?.snippet || {};

    if (!title) {
      throw new HttpException(
        'Cannot get video information.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const video = new Video();

    video.title = title;
    video.description = description || '';
    video.youtubeId = youtubeId;
    video.sharedLink = sharedLink;

    if (user) {
      video.createdBy = user;
    }
    const videoAdded = this.videoRepository.save(video);

    return videoAdded;
  }

  getAll(): Promise<Video[]> {
    return this.videoRepository.find({ order: { createdAt: 'desc' } });
  }

  getVideoByYoutubeId(youtubeId: string): Promise<Video> {
    return this.videoRepository.findOne({ where: { youtubeId } });
  }

  extractYouTubeId(url: string): string {
    // Extract the YouTubeId from the shared link
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^?&]+)/,
    );

    return match && match[1] ? match[1] : '';
  }

  async getVideoInfoById(youtubeId: string): Promise<any> {
    const youtubeConfig = this.configService.get('youtube');
    const response = await lastValueFrom(
      this.httpService.get(`${youtubeConfig.apiUrl}/videos`, {
        params: {
          id: youtubeId,
          part: 'snippet',
          key: youtubeConfig.apiKey,
        },
      }),
    );

    return response.data;
  }
}
