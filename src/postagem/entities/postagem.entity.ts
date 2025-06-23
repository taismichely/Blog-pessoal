import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//@ simbolo que transcreve para o sql o que deve fazer
//Entidades = tabelas
@Entity({ name: 'tb_postagens' })
//Cria uma tabela do banco dados
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;
}
