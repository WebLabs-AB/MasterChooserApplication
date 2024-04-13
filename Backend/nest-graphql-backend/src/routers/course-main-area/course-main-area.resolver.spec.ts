import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainAreaResolver } from './course-main-area.resolver';

describe('CourseMainAreaResolver', () => {
  let resolver: CourseMainAreaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseMainAreaResolver],
    }).compile();

    resolver = module.get<CourseMainAreaResolver>(CourseMainAreaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
