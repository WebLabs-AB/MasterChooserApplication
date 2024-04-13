import { Test, TestingModule } from '@nestjs/testing';
import { EducationCourseController } from './education-course.controller';

describe('EducationCourseController', () => {
  let controller: EducationCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationCourseController],
    }).compile();

    controller = module.get<EducationCourseController>(EducationCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
