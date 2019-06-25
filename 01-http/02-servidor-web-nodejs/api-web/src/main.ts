import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import requireActual = jest.requireActual;
import {join} from "path";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';
import * as favicon from 'serve-favicon';
import * as path from "path";
import * as session from 'express-session'; // Typescript
const FileStore = require('session-file-store')(session); // Nodejs
//import
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;
  app.use(favicon(path.join(__dirname,'..','publico','Imagenes','ironman.ico')));
  app.use(cookieParser('Me gusta el encebollado'));
  app.use(
      session({
        name: 'server-session-id',
        secret: 'No sera de tomar un traguito',
        resave: false,
        saveUninitialized: true,
        cookie: {
          secure: false
        },
        store: new FileStore()
      })
  );
  // @ts-ignore
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));
  await app.listen(3012);

}
bootstrap();
