import { Test, TestingModule } from '@nestjs/testing';
import { CourseStartingYearController } from './course-starting-year.controller';

describe('CourseStartingYearController', () => {
  let controller: CourseStartingYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseStartingYearController],
    }).compile();

    controller = module.get<CourseStartingYearController>(CourseStartingYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
