import { Test, TestingModule } from '@nestjs/testing';
import { EducationCourseService } from './education-course.service';

describe('EducationCourseService', () => {
  let service: EducationCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationCourseService],
    }).compile();

    service = module.get<EducationCourseService>(EducationCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
