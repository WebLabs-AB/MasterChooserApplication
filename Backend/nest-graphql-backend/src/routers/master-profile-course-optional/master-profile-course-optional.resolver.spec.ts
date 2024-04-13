import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseOptionalResolver } from './master-profile-course-optional.resolver';

describe('MasterProfileCourseOptionalResolver', () => {
  let resolver: MasterProfileCourseOptionalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProfileCourseOptionalResolver],
    }).compile();

    resolver = module.get<MasterProfileCourseOptionalResolver>(MasterProfileCourseOptionalResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
