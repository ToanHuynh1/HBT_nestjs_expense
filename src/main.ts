import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // sử dụng validation global
  app.useGlobalPipes(
   new ValidationPipe({
    // chỉ cho phép các thuộc tính trong dto
    whitelist: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    }
   })
  )
  await app.listen(3000);
}
bootstrap();
