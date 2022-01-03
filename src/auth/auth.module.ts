import { Module } from "@nestjs/common";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./repos/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
