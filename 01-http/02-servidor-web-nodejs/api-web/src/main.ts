import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cookieParser = require('cookie-parser');
import requireActual = jest.requireActual;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser('Me gusta el encebollado'));
  await app.listen(3001);

}
bootstrap();
