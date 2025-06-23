import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostagemService {
  //Construtor da classe, com injectrepository ele ja faz .this para todos
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}
  //Adicionar método como promessa com async para classe 'postagem'
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }
}
