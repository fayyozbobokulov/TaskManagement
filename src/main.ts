import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle("Task Management App")
    .setDescription("The Task Management App API description")
    .setVersion("1.0")
    .addTag("Tasks")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(configService.get("port"), () =>
    console.log(`App is running on port : ${configService.get("port")}`)
  );
}
bootstrap();
