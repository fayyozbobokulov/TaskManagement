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
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./../services/tasks.service";
import { CreateTaskDto } from "./../dto/create-task.dto";
import { GetFilterTasksDto } from "../dto/get-tasks-filter.dto";
import { TaskStatusValidationPipe } from "src/tasks/pipes/task-status-validation.pipe";
import { TaskStatus } from "../enums/task-status.enum";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/decorators/get-user.decorator";
import { User } from "src/auth/entities/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createTaskDto: CreateTaskDto, @GetUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  findTasks(
    @Query(ValidationPipe) filterTaskDto: GetFilterTasksDto,
    @GetUser() user: User
  ) {
    return this.tasksService.findTasks(filterTaskDto, user);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @GetUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(":id")
  @UsePipes()
  update(
    @Param("id") id: string,
    @Body("status", TaskStatusValidationPipe)
    status: TaskStatus,
    @GetUser() user: User
  ) {
    return this.tasksService.update(id, status, user);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @GetUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
