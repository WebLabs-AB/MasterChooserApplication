import { Test, TestingModule } from '@nestjs/testing';
import { PackageCourseResolver } from './package-course.resolver';

describe('PackageCourseResolver', () => {
  let resolver: PackageCourseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageCourseResolver],
    }).compile();

    resolver = module.get<PackageCourseResolver>(PackageCourseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
