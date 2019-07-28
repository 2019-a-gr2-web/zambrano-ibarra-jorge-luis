import { Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Entity, OneToMany } from 'typeorm';
import { ActorEntity } from '../actor/actor.entity';
import { PedidoEntity } from '../pedido/pedido.entity';
import { DetalleEntity } from '../detalle/detalle.entity';

@Entity('pelicula')
export class PeliculaEntity{

  @PrimaryGeneratedColumn()
  idPelicula:number;

  @Column({
    type:'varchar',
    length:50,
    name:'nombre_pelicula',
  })
  nombrePelicula:string;

  @Column({
    type:'varchar',
    length:100,
    name:'actores_principales_pelicula'
  })
  actoresPrincipalesPelicula:string;

  @Column({
    type:'varchar',
    length:255,
    name:'sinopsis_pelicula'
  })
  sinopsisPelicula:string;

  @Column({
    type:'int',
    name:'anio_lanzamiento_pelicula'
  })
  anioLanzamientoPelicula:number;

  @Column({
    type:'int',
    name:'rating_pelicula'
  })
  ratingPelicula:number;

  @Column({
    type:'double',
    name:'precio_pelicula'
  })
  precioPelicula:number;

  @OneToMany(type => DetalleEntity, detalle => detalle.idHijo)
  idDetalle:DetalleEntity[];

  @ManyToOne(type=>ActorEntity, actor =>actor.peliculas)
  actor:ActorEntity;


}
