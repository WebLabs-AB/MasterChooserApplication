import { Test, TestingModule } from '@nestjs/testing';
import { StartingYearService } from './starting-year.service';

describe('StartingYearService', () => {
  let service: StartingYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StartingYearService],
    }).compile();

    service = module.get<StartingYearService>(StartingYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
