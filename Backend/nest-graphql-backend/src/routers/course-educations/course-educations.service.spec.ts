import { Test, TestingModule } from '@nestjs/testing';
import { CourseEducationsService } from './course-educations.service';

describe('CourseEducationsService', () => {
  let service: CourseEducationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseEducationsService],
    }).compile();

    service = module.get<CourseEducationsService>(CourseEducationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
