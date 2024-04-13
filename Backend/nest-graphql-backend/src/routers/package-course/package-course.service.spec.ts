import { Test, TestingModule } from '@nestjs/testing';
import { PackageCourseService } from './package-course.service';

describe('PackageCourseService', () => {
  let service: PackageCourseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PackageCourseService],
    }).compile();

    service = module.get<PackageCourseService>(PackageCourseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
