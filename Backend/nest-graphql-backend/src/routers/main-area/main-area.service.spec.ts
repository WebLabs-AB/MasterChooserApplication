import { Test, TestingModule } from '@nestjs/testing';
import { MainAreaService } from './main-area.service';

describe('MainAreaService', () => {
  let service: MainAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainAreaService],
    }).compile();

    service = module.get<MainAreaService>(MainAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
