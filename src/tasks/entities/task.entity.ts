import { type } from "os";
import { User } from "src/auth/entities/user.entity";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("tasks")
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @ManyToOne((type) => User, (user) => user.tasks, { eager: false })
  user: User;

  @Column()
  userId: string;
}
