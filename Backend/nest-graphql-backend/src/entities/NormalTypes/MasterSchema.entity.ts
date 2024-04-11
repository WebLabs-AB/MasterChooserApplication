import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

/**
 * Represents a master profile, which is a specialization of
 * an education. A master profile sets additional requirements
 * on possible courses.
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
