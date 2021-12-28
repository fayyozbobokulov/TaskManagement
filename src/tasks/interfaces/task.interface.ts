import { TaskStatus } from "../enums/task-status.enum";

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
