import { Controller, Get, Res } from '@nestjs/common';
import {DetallereservaService} from "./detallereserva.service";


@Controller('av/detalle')
export class DetallereservaController{
    constructor(private readonly _detalleServices:DetallereservaService){

    }


}
