import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MongoRepository, ObjectId } from 'typeorm';
import { Video } from './videos.entity';
import { ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CreatedByDto } from './videos.dto';

describe('VideosService', () => {
  let service: VideosService;
  let videoRepository: MongoRepository<Video>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        VideosService,
        {
          provide: 'VideoRepository', // Replace with your actual repository token
          useClass: MongoRepository, // Replace with your actual repository class
        },
        ConfigService,
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
    videoRepository = module.get<MongoRepository<Video>>('VideoRepository');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('share new movie', () => {
    it('should create a new video', async () => {
      const sharedLink = 'https://www.youtube.com/watch?v=123456';
      const youtubeId = '123456';
      const user: CreatedByDto = {
        id: 'E1c03QaueF8B80w',
        email: 'wooowebsite@gmail.com',
      };

      const videoInfo = {
        items: [
          {
            snippet: {
              title: 'Test Video',
              description: 'This is a test video',
            },
          },
        ],
      };

      jest.spyOn(service, 'extractYouTubeId').mockReturnValue(youtubeId);
      jest.spyOn(service, 'getVideoByYoutubeId').mockResolvedValue(null);
      jest.spyOn(service, 'getVideoInfoById').mockResolvedValue(videoInfo);

      const saveMock = jest
        .spyOn(videoRepository, 'save')
        .mockResolvedValue({} as Video);

      const result = await service.create(sharedLink, user);

      expect(service.extractYouTubeId).toHaveBeenCalledWith(sharedLink);
      expect(service.getVideoByYoutubeId).toHaveBeenCalledWith(youtubeId);
      expect(service.getVideoInfoById).toHaveBeenCalledWith(youtubeId);
      expect(saveMock).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should throw an exception if shared link is invalid', async () => {
      const sharedLink = 'invalid-link';
      const user: CreatedByDto = {
        id: 'E1c03QaueF8B80w',
        email: 'wooowebsite@gmail.com',
      };

      jest.spyOn(service, 'extractYouTubeId').mockReturnValue('');

      await expect(service.create(sharedLink, user)).rejects.toThrowError(
        new HttpException('Shared link is invalid.', HttpStatus.BAD_REQUEST),
      );
    });

    it('should throw an exception if video already exists', async () => {
      const sharedLink = 'https://www.youtube.com/watch?v=123456';
      const youtubeId = '123456';
      const user: CreatedByDto = {
        id: 'E1c03QaueF8B80w',
        email: 'wooowebsite@gmail.com',
      };

      jest.spyOn(service, 'extractYouTubeId').mockReturnValue(youtubeId);
      jest.spyOn(service, 'getVideoByYoutubeId').mockResolvedValue({} as Video);

      await expect(service.create(sharedLink, user)).rejects.toThrowError(
        new HttpException(
          'This video has been shared.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });

    it('should throw an exception if video information cannot be retrieved', async () => {
      const sharedLink = 'https://www.youtube.com/watch?v=123456';
      const youtubeId = '123456';
      const user: CreatedByDto = {
        id: 'E1c03QaueF8B80w',
        email: 'wooowebsite@gmail.com',
      };

      jest.spyOn(service, 'extractYouTubeId').mockReturnValue(youtubeId);
      jest.spyOn(service, 'getVideoByYoutubeId').mockResolvedValue(null);
      jest.spyOn(service, 'getVideoInfoById').mockResolvedValue({});

      await expect(service.create(sharedLink, user)).rejects.toThrowError(
        new HttpException(
          'Cannot get video information.',
          HttpStatus.BAD_REQUEST,
        ),
      );
    });
  });

  describe('getAll', () => {
    it('should return all videos in descending order', async () => {
      const video1 = {
        id: 'E1c03QaueF8B80w',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
        description: 'description',
        sharedLink:
          'https://www.youtube.com/watch?v=DZ7ZJzdhhlk&ab_channel=POPSKids',
        youtubeId: 'DZ7ZJzdhhlk',
        createdBy: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };
      const video2 = {
        id: 'E1c03QaueF8B80w',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
        description: 'description',
        sharedLink:
          'https://www.youtube.com/watch?v=DZ7ZJzdhhlk&ab_channel=POPSKids',
        youtubeId: 'DZ7ZJzdhhlk',
        createdBy: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };
      const video3 = {
        id: 'E1c03QaueF8B80w',
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
        description: 'description',
        sharedLink:
          'https://www.youtube.com/watch?v=DZ7ZJzdhhlk&ab_channel=POPSKids',
        youtubeId: 'DZ7ZJzdhhlk',
        createdBy: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };
      const videos: any = [video1, video2, video3];

      jest.spyOn(videoRepository, 'find').mockResolvedValue(videos);

      const result = await service.getAll();

      expect(videoRepository.find).toHaveBeenCalledWith({
        order: { createdAt: 'desc' },
      });
      expect(result).toEqual(videos);
    });
  });

  describe('getVideoByYoutubeId', () => {
    it('should return the video with the specified YouTube ID', async () => {
      const youtubeId = '123456';

      const video = {
        id: 'E1c03QaueF8B80w' as unknown as ObjectId,
        createdAt: new Date(),
        updatedAt: new Date(),
        title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
        description: 'description',
        sharedLink:
          'https://www.youtube.com/watch?v=DZ7ZJzdhhlk&ab_channel=POPSKids',
        youtubeId: 'DZ7ZJzdhhlk',
        createdBy: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };

      jest.spyOn(videoRepository, 'findOne').mockResolvedValue(video);

      const result = await service.getVideoByYoutubeId(youtubeId);

      expect(videoRepository.findOne).toHaveBeenCalledWith({
        where: { youtubeId },
      });
      expect(result).toEqual(video);
    });
  });

  describe('extractYouTubeId', () => {
    it('should extract the YouTube ID from the shared link', () => {
      const sharedLink = 'https://www.youtube.com/watch?v=123456';
      const youtubeId = '123456';

      const result = service.extractYouTubeId(sharedLink);

      expect(result).toEqual(youtubeId);
    });

    it('should return an empty string if the shared link is invalid', () => {
      const sharedLink = 'invalid-link';

      const result = service.extractYouTubeId(sharedLink);

      expect(result).toEqual('');
    });
  });
});
