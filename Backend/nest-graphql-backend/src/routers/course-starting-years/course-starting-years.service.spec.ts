import { Test, TestingModule } from '@nestjs/testing';
import { CourseStartingYearsService } from './course-starting-years.service';

describe('CourseStartingYearsService', () => {
  let service: CourseStartingYearsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseStartingYearsService],
    }).compile();

    service = module.get<CourseStartingYearsService>(CourseStartingYearsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
