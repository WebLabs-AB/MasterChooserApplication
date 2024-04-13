import { Test, TestingModule } from '@nestjs/testing';
import { MasterProfileController } from './master-profile.controller';

describe('MasterProfileController', () => {
  let controller: MasterProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterProfileController],
    }).compile();

    controller = module.get<MasterProfileController>(MasterProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
