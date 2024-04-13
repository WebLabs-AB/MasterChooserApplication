import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaService } from './master-schema.service';

describe('MasterSchemaService', () => {
  let service: MasterSchemaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterSchemaService],
    }).compile();

    service = module.get<MasterSchemaService>(MasterSchemaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
