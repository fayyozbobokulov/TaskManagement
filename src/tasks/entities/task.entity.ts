import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
