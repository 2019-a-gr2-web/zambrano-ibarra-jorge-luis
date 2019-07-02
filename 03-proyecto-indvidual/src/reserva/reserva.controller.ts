import { Controller, Get, Res } from '@nestjs/common';
import {ReservaService} from "./reserva.service";



@Controller('av/reserva')
export class ReservaController{
    constructor(private readonly _reservaService:ReservaService){

    }


}
