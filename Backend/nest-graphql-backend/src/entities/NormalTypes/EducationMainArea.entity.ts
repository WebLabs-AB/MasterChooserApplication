import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Education } from './Education.entity';
import { MainArea } from './MainArea.entity';

/**
 * Represents an EducationMainArea entity within the educational platform.
 * This entity establishes a many-to-many relationship between education programs and main areas,
 * indicating which main areas are associated with specific education programs.
 */
@Entity('EducationMainArea')
@ObjectType()
export class EducationMainArea extends BaseEntity {
  /**
   * The education program to which the main area is associated.
   * It establishes a many-to-one relationship with the Education entity.
   */
  @ManyToOne(
    () => Education,
    (education) => education.mainAreaBelongsToEducation,
  )
  @Field((type) => Education)
  @JoinColumn({ name: 'education_id' })
  education: Education;

  /**
   * The main area associated with the education program.
   * It establishes a many-to-one relationship with the MainArea entity.
   */
  @ManyToOne(() => MainArea, (mainArea) => mainArea.mainAreaBelongsToEducation)
  @Field((type) => MainArea)
  @JoinColumn({ name: 'main_area_name' })
  mainArea: MainArea;
}
