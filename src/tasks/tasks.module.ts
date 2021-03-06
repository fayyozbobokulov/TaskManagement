import { Module } from "@nestjs/common";
import { TasksService } from "./services/tasks.service";
import { TasksController } from "./controllers/tasks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskRepository } from "./repos/task.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([TaskRepository]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
