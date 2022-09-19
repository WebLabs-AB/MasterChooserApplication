import { Test, TestingModule } from '@nestjs/testing';
import { CoursePeriodsService } from './course-periods.service';

describe('CoursePeriodsService', () => {
  let service: CoursePeriodsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoursePeriodsService],
    }).compile();

    service = module.get<CoursePeriodsService>(CoursePeriodsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
