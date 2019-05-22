import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import requireActual = jest.requireActual;
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from "path";
//import
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(favicon(path.join(__dirname,'..','publico','Imagenes','ironman.ico')));
  app.use(cookieParser('Me gusta el encebollado'));
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  await app.listen(3011);

}
bootstrap();
