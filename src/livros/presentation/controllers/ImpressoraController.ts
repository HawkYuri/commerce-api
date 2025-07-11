import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ImpressoraService } from '../../application/ImpressoraService';
import { IImpressoraFiltro } from '../../domain/repositories/IImpressoraRepository';
import { CreateImpressoraDto } from '../dtos/create-impressora.dto';
import { FiltroImpressoraDto } from '../dtos/filtro-impressora.dto';

@Controller('impressoras')
export class ImpressoraController {
  constructor(private readonly service: ImpressoraService) {}

  @Post()
  async criar(@Body() dto: CreateImpressoraDto) {
    try {
      const impressora = await this.service.criar(dto);
      return { id: impressora.getId() };
    } catch (error: any) {
      throw new HttpException(String(error.message) || 'Erro ao criar', HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async buscar(@Param('id') id: string) {
    const impressora = await this.service.buscarPorId(id);
    if (!impressora) throw new HttpException('Não encontrada', HttpStatus.NOT_FOUND);
    return impressora;
  }

  @Get()
  async listar(@Query() query: FiltroImpressoraDto) {
    const filtro: IImpressoraFiltro = {
      marca: query.marca,
      modelo: query.modelo,
      tecnologia: query.tecnologia,
      categoria: query.categoria,
      ativo: query.ativo === 'true',
    };
    return this.service.listarTodos(filtro);
  }

  @Patch(':id')
  async atualizar(@Param('id') id: string, @Body() dados: Partial<CreateImpressoraDto>) {
    await this.service.atualizar(id, dados);
    return { message: 'Atualizado com sucesso' };
  }

  @Patch(':id/inativar')
  async inativar(@Param('id') id: string, @Body('justificativa') justificativa: string) {
    await this.service.inativar(id, justificativa);
    return { message: 'Inativada com sucesso' };
  }

  @Patch(':id/reativar')
  async reativar(@Param('id') id: string) {
    await this.service.reativar(id);
    return { message: 'Reativada com sucesso' };
  }
}
