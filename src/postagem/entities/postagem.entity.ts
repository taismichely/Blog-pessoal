import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';

//@ simbolo que transcreve para o sql o que deve fazer
//Entidades = tabelas
@Entity({ name: 'tb_postagens' })
//Cria uma tabela do banco dados
export class Postagem {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  @ApiProperty()
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  @ApiProperty()
  texto: string;

  @ApiProperty()
  @UpdateDateColumn()
  data: Date;

  @ApiProperty({ type: () => Tema })
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;

  @ApiProperty({ type: () => Usuario })
  @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;
}
