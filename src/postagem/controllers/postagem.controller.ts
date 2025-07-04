import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';
import { PostagemService } from './../services/postagem.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/postagens')
export class PostagemController {
  constructor(private readonly PostagemService: PostagemService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Postagem[]> {
    return this.PostagemService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  //Vai buscar o parametro com nome id, transformar ele em numero
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.PostagemService.findById(id);
  }

  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByAllTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    return this.PostagemService.findByAllTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  //Vai criar um json @Body, mas que deve seguir o padrao da classe postagem: Postagem
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.PostagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.PostagemService.delete(id);
  }
}
