import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { TasksService } from "./../services/tasks.service";
import { CreateTaskDto } from "./../dto/create-task.dto";
import { GetFilterTasksDto } from "../dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "src/tasks/pipes/task-status-validation.pipe";
import { TaskStatus } from "../enums/task-status.enum";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findTasks(@Query(ValidationPipe) filterTaskDto: GetFilterTasksDto) {
    return this.tasksService.findTasks(filterTaskDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(":id")
  @UsePipes()
  update(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe)
    status: TaskStatus
  ) {
    return this.tasksService.update(id, status);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.tasksService.remove(id);
  }
}
