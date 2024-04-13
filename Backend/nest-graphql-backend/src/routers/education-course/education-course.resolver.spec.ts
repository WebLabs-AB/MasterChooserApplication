import { Test, TestingModule } from '@nestjs/testing';
import { EducationCourseResolver } from './education-course.resolver';

describe('EducationCourseResolver', () => {
  let resolver: EducationCourseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationCourseResolver],
    }).compile();

    resolver = module.get<EducationCourseResolver>(EducationCourseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
