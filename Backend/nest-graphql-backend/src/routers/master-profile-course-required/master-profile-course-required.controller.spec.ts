import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseRequiredController } from './master-profile-course-required.controller';

describe('MasterProfileCourseRequiredController', () => {
  let controller: MasterProfileCourseRequiredController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProfileCourseRequiredController],
    }).compile();

    controller = module.get<MasterProfileCourseRequiredController>(MasterProfileCourseRequiredController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
