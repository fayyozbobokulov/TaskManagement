import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/tasks/enums/task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: string) {
    value = value.toUpperCase();
    if (!this.isValidStatus(value)) {
      throw new BadRequestException(`${value} is invalid status!`);
    }

    return value;
  }

  private isValidStatus(value: any) {
    return this.allowedStatuses.includes(value);
  }
}
