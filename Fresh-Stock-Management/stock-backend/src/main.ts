// src/main.ts (ในโปรเจกต์ stock-backend)

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config(); // โหลด .env

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // << เปิด Cors ให้ Front-end เชื่อมต่อได้

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 Backend server is running on http://localhost:${port}`);
}
bootstrap();