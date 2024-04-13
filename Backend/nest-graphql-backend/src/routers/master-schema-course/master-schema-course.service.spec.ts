import { Test, TestingModule } from '@nestjs/testing';
import { MasterSchemaCourseService } from './master-schema-course.service';

describe('MasterSchemaCourseService', () => {
  let service: MasterSchemaCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterSchemaCourseService],
    }).compile();

    service = module.get<MasterSchemaCourseService>(MasterSchemaCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
