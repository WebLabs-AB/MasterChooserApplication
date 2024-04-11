import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents an education which is offered at a university.
 * The education limits which courses a student can study.
 */
@Entity('Education')
@ObjectType()
export class Education extends BaseEntity {
    /**
     * ID of the education, which uniquely identifies the education.
     */
    @PrimaryColumn({ name: 'education_id' })
    @Field((type) => Int)
    educationId: number;

    /**
     * Full name of the education.
     */
    @Column()
    @Field()
    name: string;

    /**
     * Number of ECTS (swe. HP) on advanced level required for the education.
     */
    @Column()
    @Field((type) => Int)
    totalA1X: number;

    /**
     * Short symbol for the education. For instance,
     * - D -> data technology
     * - U -> software development
     */
    @Column()
    @Field()
    symbol: string;

    // TODO: UniversityId
}
