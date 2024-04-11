import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a master schema, which students can create.
 * A master schema represents planned master courses.
 */
@Entity('MasterSchema')
@ObjectType()
export class MasterSchema extends BaseEntity {
    /**
     * ID of the master schema, which uniquely identifies
     * the master schema.
     */
    @PrimaryColumn({ name: 'master_schema_id' })
    @Field((type) => Int)
    masterSchemaId: number;

    /**
     * Date of when the schema was created.
     */
    @CreateDateColumn()
    @Field()
    createdDate: string;

    /**
     * A boolean representing whether the schema is finished or not.
     */
    @Column()
    @Field()
    finished: boolean;

    /**
     * Year of when the first master coures will be studied.
     */
    @Column()
    @Field((type) => Int)
    firstYear: number;

    // TODO: StudentEmail

    // TODO: MainAreaName
}
