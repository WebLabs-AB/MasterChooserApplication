import { Test, TestingModule } from '@nestjs/testing';
import { PackageCourseController } from './package-course.controller';

describe('PackageCourseController', () => {
  let controller: PackageCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageCourseController],
    }).compile();

    controller = module.get<PackageCourseController>(PackageCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
