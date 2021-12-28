import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configuration from "./config/configuration";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    })
  ],
})
export class GlobalModule {}
