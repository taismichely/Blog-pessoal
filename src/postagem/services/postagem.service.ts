import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Postagem } from '../entities/postagem.entity';

@Injectable()
export class PostagemService {
  //Construtor da classe, com injectrepository ele ja faz .this para todos
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}
  //Adicionar método como promessa com async para classe 'postagem'
  //Método listar tudo
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  //Método listar por id
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    if (!postagem) {
      throw new HttpException(
        'Não existe esta postagem!',
        HttpStatus.NOT_FOUND,
      );
    }
    return postagem;
  }

  async findByAllTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  //Método cadastrar
  async create(postagem: Postagem): Promise<Postagem> {
    return await this.postagemRepository.save(postagem);
  }

  //Método atualizar
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id);
    return await this.postagemRepository.save(postagem);
  }

  //Método deletar
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.postagemRepository.delete(id);
  }
}
