import { Test, TestingModule } from '@nestjs/testing';
import { GeneralRequirementsService } from './general-requirements.service';

describe('GeneralRequirementsService', () => {
  let service: GeneralRequirementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralRequirementsService],
    }).compile();

    service = module.get<GeneralRequirementsService>(
      GeneralRequirementsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
