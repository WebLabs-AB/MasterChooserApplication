import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a main area. All courses are part of one or more
 * main areas, such as "data technology" and "computer science".
 */
@Entity('MainArea')
@ObjectType()
export class MainArea extends BaseEntity {
    /**
     * Name of the main area.
     */
    @PrimaryColumn({ name: 'name' })
    @Field()
    name: number;
}
