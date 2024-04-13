import { Test, TestingModule } from '@nestjs/testing';
import { StartingYearController } from './starting-year.controller';

describe('StartingYearController', () => {
  let controller: StartingYearController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StartingYearController],
    }).compile();

    controller = module.get<StartingYearController>(StartingYearController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
