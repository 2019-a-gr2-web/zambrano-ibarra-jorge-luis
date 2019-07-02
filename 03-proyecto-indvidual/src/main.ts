import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import {join} from "path";
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.setBaseViewsDir(join(__dirname,'..','views'));
  app.use(express.static('publico'));
  app.setViewEngine('ejs');
  await app.listen(3012);

}
bootstrap();
