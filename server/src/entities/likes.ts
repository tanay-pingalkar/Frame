import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  CreateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { Frame } from "./frame";
import { Users } from "./users";

@Entity()
@ObjectType()
export class Like extends BaseEntity {
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
  giver: Users;

  @Field(() => Frame)
  @ManyToOne(() => Frame, (frame) => frame.likes)
  taker: Frame;
}
