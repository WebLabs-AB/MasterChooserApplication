import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainAreaController } from './course-main-area.controller';

describe('CourseMainAreaController', () => {
  let controller: CourseMainAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseMainAreaController],
    }).compile();

    controller = module.get<CourseMainAreaController>(CourseMainAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
