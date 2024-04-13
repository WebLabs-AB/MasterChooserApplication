import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseRequiredService } from './master-profile-course-required.service';

describe('MasterProfileCourseRequiredService', () => {
  let service: MasterProfileCourseRequiredService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProfileCourseRequiredService],
    }).compile();

    service = module.get<MasterProfileCourseRequiredService>(MasterProfileCourseRequiredService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
