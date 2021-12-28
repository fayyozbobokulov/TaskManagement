import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../enums/task-status.enum";

export class GetFilterTasksDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.IN_PROGRESS, TaskStatus.OPEN])
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
