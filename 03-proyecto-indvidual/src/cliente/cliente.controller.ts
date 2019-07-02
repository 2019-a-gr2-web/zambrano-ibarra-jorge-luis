import {Controller, Get, Post, Res} from '@nestjs/common';

import {ClienteService} from "./cliente.service";
import {Tragos} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/tragos";
import {TragosCreateDto} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/dto/tragos.create.dto";
import {Body} from "@nestjs/common/decorators/http/route-params.decorator";
import {Cliente} from "./interfaces/cliente";
import {ClienteCreateDto} from "./dto/cliente.create.dto";
import {validate} from "class-validator";
import {ClienteEntity} from "./cliente.entity";


@Controller('aventura/cliente')
export class ClienteController{
    constructor(private readonly _clienteServices:ClienteService){

    }

    @Get('/menu')
    inicio(
        @Res() res,
    ){
        res.render('cliente/menu-cliente');
    }

    @Get('/crear')
    crear(
        @Res() res,
    ){
        res.render('cliente/crear-editar-cliente');
    }

    @Post('crear')
    async crearClientePost(
        @Body() cliente: ClienteEntity,
        @Res() res
    ) {

        let clienteAValidar = new ClienteCreateDto();

        clienteAValidar.nombreCliente = cliente.nombreCliente;
        clienteAValidar.cedulaCliente = (cliente.cedulaCliente);
        clienteAValidar.telefonoCliente = Number(cliente.telefonoCliente);
        clienteAValidar.direccionCliente = cliente.direccionCliente;


        console.log(cliente);
        try {
            const errores = await validate(clienteAValidar);
            if (errores.length > 0) {
                console.error(errores);

            } else {

                const respuestaCrear = await this._clienteServices
                    .crear(cliente); // Promesa

                console.log('RESPUESTA: ', respuestaCrear);


            }
        } catch
            (e) {
            console.error(e);
            res.status(500);
            res.send({mensaje: 'Error', codigo: 500});
        }


    }

}
