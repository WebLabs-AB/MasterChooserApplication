import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaCourseController } from './master-schema-course.controller';

describe('MasterSchemaCourseController', () => {
  let controller: MasterSchemaCourseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterSchemaCourseController],
    }).compile();

    controller = module.get<MasterSchemaCourseController>(MasterSchemaCourseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
