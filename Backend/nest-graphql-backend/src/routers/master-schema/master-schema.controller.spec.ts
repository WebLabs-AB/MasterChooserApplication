import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaController } from './master-schema.controller';

describe('MasterSchemaController', () => {
  let controller: MasterSchemaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MasterSchemaController],
    }).compile();

    controller = module.get<MasterSchemaController>(MasterSchemaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
