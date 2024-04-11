import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a year, which a student started studying.
 */
@Entity('StartingYear')
@ObjectType()
export class StartingYear extends BaseEntity {
    /**
     * Year.
     */
    @PrimaryColumn({ name: 'year' })
    @Field((type) => Int)
    year: number;
}
