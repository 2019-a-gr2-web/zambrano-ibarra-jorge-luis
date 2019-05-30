import {Controller, Get, Post, Res, Body} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Tragos} from "./interfaces/tragos";


@Controller('api/traguito')
export class TragosController {
    constructor(private readonly _tragosService:TragosService){
    }
    @Get('lista')
    listarTragos( @Res() res){
        const arregloTragos= this._tragosService.bddTragos;
        res.render('tragos/lista-tragos', {arregloTragos:arregloTragos})
    }
    @Get('crear')
    creaTtragos( @Res() res){
        res.render('tragos/crear-editar')
    }
    @Post('crear')
    crearTragoPost(
        @Body() trago:Tragos,
        @Res() res
    ){

        trago.gradosAlcohol=Number(trago.gradosAlcohol);
        trago.precio=Number(trago.precio);
        trago.fechaCaducidad =new Date(trago.fechaCaducidad);
        console.log(trago);
        this._tragosService.crear(trago);
        res.redirect('/api/traguito/lista');
    }

    @Post('eliminar')
    eliminarTrago(@Res() res,
                  @Body('id') id: number) {

        this._tragosService.eliminarPorId(Number(id));
        res.redirect('/api/traguito/lista');
    }


}