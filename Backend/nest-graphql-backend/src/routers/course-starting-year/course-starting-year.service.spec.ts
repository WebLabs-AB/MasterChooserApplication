import { Test, TestingModule } from '@nestjs/testing';
import { CourseStartingYearService } from './course-starting-year.service';

describe('CourseStartingYearService', () => {
  let service: CourseStartingYearService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseStartingYearService],
    }).compile();

    service = module.get<CourseStartingYearService>(CourseStartingYearService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
