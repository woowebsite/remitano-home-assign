import { Test, TestingModule } from '@nestjs/testing';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';

describe('VideosController', () => {
  let videosController: VideosController;
  let videosService: VideosService;

  beforeEach(async () => {
    const VideosServiceProvider = {
      provide: VideosService,
      useValue: {
        getAll: jest.fn().mockReturnValue([
          {
            id: '6496d18c95018cf513a20a4a',
            createdAt: '2023-09-27T11:21:24.825Z',
            updatedAt: '2023-09-27T11:21:24.825Z',
            title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
            description: 'Video description',
            sharedLink: 'https://www.youtube.com/watch?v=SucKqDH4XwM',
            youtubeId: 'SucKqDH4XwM',
            createdBy: {
              id: 'E1c03QaueF8B80w',
              email: 'wooowebsite@gmail.com',
            },
          },
        ]),
        create: jest.fn().mockReturnValue({
          id: '6496d18c95018cf513a20a4a',
          createdAt: '2023-09-27T11:21:24.825Z',
          updatedAt: '2023-09-27T11:21:24.825Z',
          title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
          description: 'Video description',
          sharedLink: 'https://www.youtube.com/watch?v=SucKqDH4XwM',
          youtubeId: 'SucKqDH4XwM',
          createdBy: {
            id: 'E1c03QaueF8B80w',
            email: 'wooowebsite@gmail.com',
          },
        }),
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [VideosService, VideosServiceProvider],
    }).compile();

    videosController = module.get<VideosController>(VideosController);
    videosService = module.get<VideosService>(VideosService);
  });

  describe('getAll', () => {
    it('should call videosService.getAll and return the result', async () => {
      const expectedData: any = [
        [
          {
            id: '6496d18c95018cf513a20a4a',
            createdAt: '2023-09-27T11:21:24.825Z',
            updatedAt: '2023-09-27T11:21:24.825Z',
            title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
            description: 'Video description',
            sharedLink: 'https://www.youtube.com/watch?v=SucKqDH4XwM',
            youtubeId: 'SucKqDH4XwM',
            createdBy: {
              id: 'E1c03QaueF8B80w',
              email: 'wooowebsite@gmail.com',
            },
          },
        ],
      ];

      const getAllMock = jest.spyOn(videosService, 'getAll');
      getAllMock.mockResolvedValue(expectedData);

      const result = await videosController.getAll();
      expect(videosService.getAll).toHaveBeenCalled();

      expect(result).toEqual(expectedData);
    });
  });

  describe('create - share video', () => {
    it('should call videosService.create and return the result', async () => {
      const req = {
        user: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };

      const createMock = jest.spyOn(videosService, 'create');
      const sharedLink = 'https://www.youtube.com/watch?v=SucKqDH4XwM';

      const expectedResult: any = {
        id: '6496d18c95018cf513a20a4a',
        createdAt: '2023-09-27T11:21:24.825Z',
        updatedAt: '2023-09-27T11:21:24.825Z',
        title: 'Tin tức thời sự 28/9: Chủ tịch Quốc hội nhận huân chương cao quý của Cuba | Báo VietNamNet',
        description: 'Video description',
        sharedLink: 'https://www.youtube.com/watch?v=SucKqDH4XwM',
        youtubeId: 'SucKqDH4XwM',
        createdBy: {
          id: 'E1c03QaueF8B80w',
          email: 'wooowebsite@gmail.com',
        },
      };

      createMock.mockResolvedValue(expectedResult);

      const result = await videosController.create({ sharedLink }, req);

      expect(createMock).toHaveBeenCalledWith(sharedLink, req.user);

      expect(result).toEqual(expectedResult);
    });
  });
});
