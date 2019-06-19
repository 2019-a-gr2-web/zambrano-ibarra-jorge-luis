import {Controller, Get, Post, Res, Body, Query} from "@nestjs/common";
import {TragosService} from "./tragos.service";
import {Tragos} from "./interfaces/tragos";
import {TragosCreateDto} from "./dto/tragos.create.dto";
import {validate} from "class-validator";


@Controller('api/traguito')
export class TragosController {
    constructor(private readonly _tragosService: TragosService) {
    }

    @Get('lista')
    async listarTragos(@Res() res) {
        const arregloTragos = await this._tragosService.buscar();
        res.render('tragos/lista-tragos', {arregloTragos: arregloTragos})
    }

    @Get('crear')
    creaTtragos(@Res() res, @Query('mensaje') mensaje:string) {
        res.render('tragos/crear-editar',
            {mensaje: mensaje})
    }

    @Post('crear')
    async crearTragoPost(
        @Body() trago: Tragos,
        @Res() res
    ) {
        trago.gradosAlcohol = Number(trago.gradosAlcohol);
        trago.precio = Number(trago.precio);
        trago.fechaCaducidad = trago.fechaCaducidad ? new Date(trago.fechaCaducidad) : undefined;
        let tragoAValidar = new TragosCreateDto();

        tragoAValidar.nombre = trago.nombre;
        tragoAValidar.tipo = trago.tipo;
        tragoAValidar.fechaCaducidad=trago.fechaCaducidad;
        tragoAValidar.precio = trago.precio;
        tragoAValidar.gradosAlcohol = trago.gradosAlcohol;

        console.log(trago);
        try {
            const errores = await validate(tragoAValidar);
            if (errores.length > 0) {
                console.error(errores);
                res.redirect('/api/traguito/crear?mensaje=Tienes un error en el formulario')
            } else {

                const respuestaCrear = await this._tragosService
                    .crear(trago); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);

                res.redirect('/api/traguito/lista');
            }
        } catch
            (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }


    }

    @Post('eliminar')
    eliminarTrago(@Res() res,
                  @Body('id') id: number) {

        this._tragosService.eliminarPorId(Number(id));
        res.redirect('/api/traguito/lista');
    }


}