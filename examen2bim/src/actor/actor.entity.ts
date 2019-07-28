import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PeliculaEntity } from '../pelicula/pelicula.entity';

@Entity('actor')
export class ActorEntity{

  @PrimaryGeneratedColumn()
  idActor:number;

  @Column({
    type:'varchar',
    length:50,
    name:'nombre_actor',
  })
  nombreActor:string;

  @Column({
    type:'varchar',
    length:50,
    name:'apellido_actor',
  })
  apellidoActor:string;

  @Column({
    type:'date',
    name:'fecha_nacimiento_actor',
  })
  fechaNacimientoActor:Date;

  @Column({
    type:'int',
    name:'numero_pelicula_actor',
  })
  numeroPeliculaActor:number;

  @Column({
    type:'boolean',
    name:'retirado',
  })
  retiradoActor:boolean;

  @OneToMany(type=>PeliculaEntity, peli=>peli.actor)
  peliculas:PeliculaEntity[];

}
