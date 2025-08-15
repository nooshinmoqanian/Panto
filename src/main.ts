import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const config = new DocumentBuilder()
    .setTitle("PANTOhealth Signals API")
    .setDescription("IoT X-ray signals processing with RabbitMQ + Mongo")
    .setVersion("1.0.0")
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/docs", app, doc);

  await app.listen(3000);
  console.log(
    "API: http://localhost:3000  |  Docs: http://localhost:3000/docs",
  );
}
bootstrap();
