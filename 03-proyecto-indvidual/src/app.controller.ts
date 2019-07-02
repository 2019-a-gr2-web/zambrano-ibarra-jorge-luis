import {Controller, Get, Req, Res} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('aventura')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('inicio')
  inicio(
      @Res() res,
  ){
    res.render('menuprincipal/menu');
  }




}
