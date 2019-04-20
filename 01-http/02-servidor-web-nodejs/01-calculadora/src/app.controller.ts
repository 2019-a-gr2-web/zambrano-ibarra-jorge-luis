import { Controller, Get, Headers, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/calculadora')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/suma')
  @HttpCode(200)
  sumaJorge(@Headers() headers): string {
    console.log('Headers', headers);
    const numero1 = Number(headers.numero1);
    const numero2 = Number(headers.numero2);
    const suma= numero1+numero2;
    return `La suma es: ${suma}`;
  }
  
}
