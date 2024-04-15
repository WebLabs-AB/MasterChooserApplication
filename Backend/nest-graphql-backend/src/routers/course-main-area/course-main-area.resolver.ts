import { Query, Resolver } from '@nestjs/graphql';
import { CourseMainArea } from 'src/entities/NormalTypes/CourseMainArea.entity';
import { CourseMainAreaService } from './course-main-area.service';

@Resolver()
export class CourseMainAreaResolver {
  constructor(private courseMainareaService: CourseMainAreaService) {}

  // Returns all CourseMainArea obejcts from database in a list.
  @Query((returns) => [CourseMainArea])
  async courseMainAreas(): Promise<CourseMainArea[]> {
    return this.courseMainareaService.findAll();
  }
}
