import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainAreaService } from './course-main-area.service';

describe('CourseMainAreaService', () => {
  let service: CourseMainAreaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseMainAreaService],
    }).compile();

    service = module.get<CourseMainAreaService>(CourseMainAreaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
