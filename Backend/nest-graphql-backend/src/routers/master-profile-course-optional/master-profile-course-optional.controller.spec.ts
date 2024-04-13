import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileCourseOptionalController } from './master-profile-course-optional.controller';

describe('MasterProfileCourseOptionalController', () => {
  let controller: MasterProfileCourseOptionalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProfileCourseOptionalController],
    }).compile();

    controller = module.get<MasterProfileCourseOptionalController>(MasterProfileCourseOptionalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
