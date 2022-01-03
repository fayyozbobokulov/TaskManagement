import { Task } from "./../entities/task.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskStatus } from "../enums/task-status.enum";
import { GetFilterTasksDto } from "../dto/get-tasks-filter.dto";
import { User } from "src/auth/entities/user.entity";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async findTasks(filterTaskDto: GetFilterTasksDto, user: User): Promise<any> {
    const { search, status } = filterTaskDto;

    const query = this.createQueryBuilder("task");

    query.where("task.userId = :userId", { userId: user.id });

    if (status) {
      query.andWhere("task.status = :status", { status });
    }

    if (search) {
      query.andWhere(
        "task.title LIKE :search OR task.description LIKE :search",
        { search: `%${search}%` }
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }
}
