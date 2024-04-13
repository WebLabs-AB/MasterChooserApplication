import { Test, TestingModule } from '@nestjs/testing';
import { MainAreaController } from './main-area.controller';

describe('MainAreaController', () => {
  let controller: MainAreaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainAreaController],
    }).compile();

    controller = module.get<MainAreaController>(MainAreaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
