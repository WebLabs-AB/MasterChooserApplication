import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaResolver } from './master-schema.resolver';

describe('MasterSchemaResolver', () => {
  let resolver: MasterSchemaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterSchemaResolver],
    }).compile();

    resolver = module.get<MasterSchemaResolver>(MasterSchemaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
