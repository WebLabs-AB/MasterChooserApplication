import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { University } from './University.entity';

@Entity('GeneralRequirements')
@ObjectType()
export class GeneralRequirements extends BaseEntity {
  @PrimaryColumn()
  universityName: string;
  @OneToOne(() => University, { cascade: true })
  @JoinColumn({ name: 'universityName' })
  university: University;

  @BeforeInsert()
  newid() {
    this.universityName = this.university.universityName;
  }

  @Column()
  @Field((type) => Int)
  A1XHp: number;

  @Column()
  @Field((type) => Int)
  MainAreaHp: number;
}
