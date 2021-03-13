import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Users } from "./users";

@Entity()
@ObjectType()
export class Frame extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => Users)
  @ManyToOne(() => Users, (user) => user.frames)
  user: Users;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  frame: string;

  @Field(() => String)
  @Column()
  description: string;
}
