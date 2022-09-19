import { Test, TestingModule } from '@nestjs/testing';
import { CourseMainareasService } from './course-mainareas.service';

describe('CourseMainareasService', () => {
  let service: CourseMainareasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseMainareasService],
    }).compile();

    service = module.get<CourseMainareasService>(CourseMainareasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
