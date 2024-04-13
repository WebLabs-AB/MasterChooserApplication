import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseOptionalService } from './master-profile-course-optional.service';

describe('MasterProfileCourseOptionalService', () => {
  let service: MasterProfileCourseOptionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterProfileCourseOptionalService],
    }).compile();

    service = module.get<MasterProfileCourseOptionalService>(MasterProfileCourseOptionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
