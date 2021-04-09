import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Frame } from "./frame";
import { Like } from "./likes";

@Entity()
@ObjectType()
export class Users extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = Date();

  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => Frame)
  @OneToMany(() => Frame, (frames) => frames.user)
  frames: Frame[];

  @Field(() => Like)
  @OneToMany(() => Like, (likes) => likes.giver)
  likes: Like[];

  @Field(() => String)
  @Column()
  password: string;
}
