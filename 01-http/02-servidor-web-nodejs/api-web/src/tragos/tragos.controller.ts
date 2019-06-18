import {Controller, Get, Post, Res, Body} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Tragos} from "./interfaces/tragos";


@Controller('api/traguito')
export class TragosController {
    constructor(private readonly _tragosService:TragosService){
    }
    @Get('lista')
    async listarTragos( @Res() res){
        const arregloTragos= await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {arregloTragos:arregloTragos})
    }
    @Get('crear')
    creaTtragos( @Res() res){
        res.render('tragos/crear-editar')
    }
    @Post('crear')
    async crearTragoPost(
        @Body() trago:Tragos,
        @Res() res
    ){        trago.gradosAlcohol=Number(trago.gradosAlcohol);
        trago.precio=Number(trago.precio);
        trago.fechaCaducidad =new Date(trago.fechaCaducidad);
        console.log(trago);
        try {
            const respuestra_crear = await this._tragosService.crear(trago);
            console.log('RESPUESTA: ', respuestra_crear)
        }catch(e){
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo:500});
        }
            res.redirect('/api/traguito/lista');
    }

    @Post('eliminar')
    eliminarTrago(@Res() res,
                  @Body('id') id: number) {

        this._tragosService.eliminarPorId(Number(id));
        res.redirect('/api/traguito/lista');
    }


}