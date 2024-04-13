import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseRequiredResolver } from './master-profile-course-required.resolver';

describe('MasterProfileCourseRequiredResolver', () => {
  let resolver: MasterProfileCourseRequiredResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProfileCourseRequiredResolver],
    }).compile();

    resolver = module.get<MasterProfileCourseRequiredResolver>(MasterProfileCourseRequiredResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
