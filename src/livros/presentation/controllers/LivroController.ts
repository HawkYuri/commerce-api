// src/livros/controller/livro.controller.ts
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { LivroService } from 'src/livros/application/LivroService';
import { CreateLivroDto } from '../dtos/create-livro.dto';
import { ILivroFiltro } from 'src/livros/domain/repositories/ILivroRepository';
import { Livro } from 'src/livros/domain/entities/Livro';
@Controller('livros')
export class LivroController {
  constructor(private readonly livroService: LivroService) {}

  @Post()
  async criar(@Body() dto: CreateLivroDto) {
    try {
      const livro = await this.livroService.criar(dto);
      return { id: livro.getId() };
    } catch (error: any) {
      throw new HttpException(
        typeof error?.message === 'string' ? (error.message as string) : 'Erro desconhecido',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async buscarPorId(@Param('id') id: string) {
    const livro = await this.livroService.buscarPorId(id);
    if (!livro) {
      throw new HttpException('Livro não encontrado', HttpStatus.NOT_FOUND);
    }

    return {
      id: livro.getId(),
      titulo: livro['getTitulo'](), // ou use toDTO() depois
      ativo: livro['getAtivo'](),
      justificativaStatus: livro['getJustificativaStatus'](),
    };
  }
  @Get()
  async listar(@Query() query: any): Promise<Livro[]> {
    const filtro: ILivroFiltro = {
      titulo: query.titulo as string,
      autor: query.autor as string,
      categoria: query.categoria as string,
      ativo: query.ativo !== undefined ? query.ativo === 'true' : undefined,
    };

    return this.livroService.listarTodos(filtro);
  }
  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() dados: Partial<CreateLivroDto>) {
    try {
      await this.livroService.atualizar(id, dados);
      return { message: 'Livro atualizado com sucesso.' };
    } catch (error: any) {
      throw new HttpException(error.message as string, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/inativar')
  async inativar(@Param('id') id: string, @Body('justificativa') justificativa: string) {
    if (!justificativa) {
      throw new HttpException('Justificativa obrigatória.', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.livroService.inativar(id, justificativa);
      return { message: 'Livro inativado com sucesso.' };
    } catch (error: any) {
      throw new HttpException(error.message as string, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/reativar')
  async reativar(@Param('id') id: string) {
    try {
      await this.livroService.reativar(id);
      return { message: 'Livro reativado com sucesso.' };
    } catch (error: any) {
      throw new HttpException(error.message as string, HttpStatus.BAD_REQUEST);
    }
  }
}
