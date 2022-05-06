import { Test, TestingModule } from '@nestjs/testing';
import { RegularuserService } from './regularuser.service';

describe('RegularuserService', () => {
  let service: RegularuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegularuserService],
    }).compile();

    service = module.get<RegularuserService>(RegularuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
