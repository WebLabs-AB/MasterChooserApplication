import { Test, TestingModule } from '@nestjs/testing';
import { EducationMainAreaService } from './education-main-area.service';

describe('EducationMainAreaService', () => {
  let service: EducationMainAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducationMainAreaService],
    }).compile();

    service = module.get<EducationMainAreaService>(EducationMainAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
