import {Controller, Get, Response, Request, Headers, Post, Body, Res} from '@nestjs/common';
import { AppService } from './app.service';
import {Tragos} from "../../../01-http/02-servidor-web-nodejs/api-web/src/tragos/interfaces/tragos";
import {Tiendas} from "./tiendas/interfacestiendas/tiendas";
import {isEmpty} from "@nestjs/common/utils/shared.utils";

@Controller('/examen')
export class AppController {
  constructor(private readonly appService: AppService) {
  }

}
