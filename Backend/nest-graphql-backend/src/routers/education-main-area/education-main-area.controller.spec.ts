import { Test, TestingModule } from '@nestjs/testing';
import { EducationMainAreaController } from './education-main-area.controller';

describe('EducationMainAreaController', () => {
  let controller: EducationMainAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationMainAreaController],
    }).compile();

    controller = module.get<EducationMainAreaController>(EducationMainAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
