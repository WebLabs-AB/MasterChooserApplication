import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

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
  /*
  @ManyToOne(() => Education, (education) => education.mainAreaConnection)
  @Field((type) => Education)
  @JoinColumn({ name: 'educationId' })
  education: Education;
  */
  /**
   * The main area associated with the education program.
   * It establishes a many-to-one relationship with the MainArea entity.
   */
  /*
  @ManyToOne(() => MainArea, (mainArea) => mainArea.educationConnection)
  @Field((type) => MainArea)
  @JoinColumn({ name: 'mainAreaName' })
  mainArea: MainArea;
  */
}
