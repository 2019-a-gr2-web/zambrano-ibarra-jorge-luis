import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import requireActual = jest.requireActual;
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
//import
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(cookieParser('Me gusta el encebollado'));
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  await app.listen(3001);

}
bootstrap();
