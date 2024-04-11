import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a university, which offers courses for students.
 */
@Entity('University')
@ObjectType()
export class University extends BaseEntity {
    /**
     * ID of the university, which is used to uniquely
     * identify a university.
     */
    @PrimaryColumn({ name: 'university_id' })
    @Field((type) => Int)
    universityId: number;

    /**
     * Name of the university.
     */
    @Column()
    @Field()
    name: string;
}
