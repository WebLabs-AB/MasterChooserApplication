import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a course package, which is part
 * of a master profile. A package specifies
 * a number of courses, where a student only has
 * to read some of the courses. The student
 * decides which of the presented courses
 * they will read.
 */
@Entity('Package')
@ObjectType()
export class Package extends BaseEntity {
    /**
     * ID of the package, which uniquely identifies the package.
     */
    @PrimaryColumn({ name: 'package_id' })
    @Field((type) => Int)
    packageId: number;

    /**
     * Name of the package.
     */
    @Column()
    @Field()
    name: string;

    /**
     * The number of courses the student
     * has to read.
     */
    @Column()
    @Field((type) => Int)
    numObligatoryCourses: number;

    // TODO: masterProfileId
}
