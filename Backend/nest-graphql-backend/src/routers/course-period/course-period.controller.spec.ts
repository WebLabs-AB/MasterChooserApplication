import { Test, TestingModule } from '@nestjs/testing';
import { CoursePeriodController } from './course-period.controller';

describe('CoursePeriodController', () => {
  let controller: CoursePeriodController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoursePeriodController],
    }).compile();

    controller = module.get<CoursePeriodController>(CoursePeriodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
