import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Course } from './Course.entity';
import { MasterSchema } from './MasterSchema.entity';

/**
 * Represents a MasterSchemaCourse entity within the educational platform.
 * This entity establishes a many-to-many relationship between courses and master schemas,
 * indicating which courses are included in specific master schemas.
 */
@Entity('MasterSchemaCourse')
@ObjectType()
export class MasterSchemaCourse extends BaseEntity {
  /**
   * The course included in the master schema.
   * It establishes a many-to-one relationship with the Course entity.
   */
  @ManyToOne(() => Course, (course) => course.courseBelongsToMasterSchema)
  @Field((type) => Course)
  @JoinColumn({ name: 'course_id' })
  course: Course;

  /**
   * The master schema to which the course belongs.
   * It establishes a many-to-one relationship with the MasterSchema entity.
   */
  @ManyToOne(
    () => MasterSchema,
    (masterSchema) => masterSchema.courseBelongsToMasterSchema,
  )
  @Field((type) => MasterSchema)
  @JoinColumn({ name: 'master_schema_id' })
  masterSchema: MasterSchema;
}
