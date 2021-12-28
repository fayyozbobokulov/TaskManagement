import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./../dto/create-task.dto";
import { ITask } from "./../interfaces/task.interface";
import { v4 } from "uuid";
import { TaskStatus } from "./../enums/task-status.enum";
import { GetFilterTasksDto } from "../dto/get-tasks-filter.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskRepository } from "../repos/task.repository";
import { Task } from "../entities/task.entity";
import { DeleteResult } from "typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async findTasks(filterTaskDto: GetFilterTasksDto): Promise<Task[]> {
    return this.taskRepository.findTasks(filterTaskDto);
  }

  async findOne(id: string): Promise<Task> {
    let found = await this.taskRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found!`);
    }
    return found;
  }

  async update(id: string, status: TaskStatus) {
    let task = await this.findOne(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.taskRepository.delete(id);
  }
}
