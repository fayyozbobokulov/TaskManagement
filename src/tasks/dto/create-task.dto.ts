import { IsNotEmpty, IsString } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  status: TaskStatus;
}
