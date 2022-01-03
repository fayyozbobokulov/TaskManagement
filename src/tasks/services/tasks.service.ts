import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./../dto/create-task.dto";
import { TaskStatus } from "./../enums/task-status.enum";
import { GetFilterTasksDto } from "../dto/get-tasks-filter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "../repos/task.repository";
import { Task } from "../entities/task.entity";
import { DeleteResult } from "typeorm";
import { User } from "src/auth/entities/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto, user);
  }

  async findTasks(
    filterTaskDto: GetFilterTasksDto,
    user: User
  ): Promise<Task[]> {
    return this.taskRepository.findTasks(filterTaskDto, user);
  }

  async findOne(id: string, user: User): Promise<Task> {
    let found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return found;
  }

  async update(id: string, status: TaskStatus, user: User) {
    let task = await this.findOne(id, user);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string, user: User): Promise<DeleteResult> {
    const result = await this.taskRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return result;
  }
}
