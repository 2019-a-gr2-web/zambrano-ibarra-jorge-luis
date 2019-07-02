import { Controller, Get, Res } from '@nestjs/common';
import {CanchaService} from "./cancha.service";


@Controller('av/cancha')
export class CanchaController{
    constructor(private readonly _canchaServices:CanchaService){

    }


}
