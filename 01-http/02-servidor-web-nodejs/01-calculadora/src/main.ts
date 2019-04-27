import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var cookieParser = require('cookie-parser');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('Me gusta el encebollado'));
  await app.listen(3005);
}

bootstrap();
