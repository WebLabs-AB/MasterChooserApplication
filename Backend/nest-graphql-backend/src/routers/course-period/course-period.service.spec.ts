import { Test, TestingModule } from '@nestjs/testing';
import { CoursePeriodService } from './course-period.service';

describe('CoursePeriodService', () => {
  let service: CoursePeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePeriodService],
    }).compile();

    service = module.get<CoursePeriodService>(CoursePeriodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
