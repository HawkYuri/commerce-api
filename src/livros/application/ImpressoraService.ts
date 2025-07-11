import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Impressora } from '../domain/entities/Impressora';
import {
  IImpressoraRepositoryToken,
  IImpressoraRepository,
  IImpressoraFiltro,
} from '../domain/repositories/IImpressoraRepository';
import { CreateImpressoraDto } from '../presentation/dtos/create-impressora.dto';

@Injectable()
export class ImpressoraService {
  constructor(
    @Inject(IImpressoraRepositoryToken)
    private readonly impressoraRepository: IImpressoraRepository,
  ) {}

  async criar(dto: CreateImpressoraDto): Promise<Impressora> {
    const impressora = new Impressora(
      uuidv4(),
      dto.marca,
      dto.modelo,
      dto.tecnologia,
      dto.precoCusto,
      dto.precoVenda,
      dto.categorias,
    );

    await this.impressoraRepository.salvar(impressora);
    return impressora;
  }

  async buscarPorId(id: string): Promise<Impressora | null> {
    return this.impressoraRepository.buscarPorId(id);
  }

  async atualizar(id: string, dados: Partial<CreateImpressoraDto>): Promise<void> {
    const impressora = await this.impressoraRepository.buscarPorId(id);
    if (!impressora) throw new Error('Impressora não encontrada');
    impressora.alterarDados(dados);
    await this.impressoraRepository.salvar(impressora);
  }

  async inativar(id: string, justificativa: string): Promise<void> {
    const impressora = await this.impressoraRepository.buscarPorId(id);
    if (!impressora) throw new Error('Impressora não encontrada');
    impressora.inativar(justificativa);
    await this.impressoraRepository.salvar(impressora);
  }

  async reativar(id: string): Promise<void> {
    const impressora = await this.impressoraRepository.buscarPorId(id);
    if (!impressora) throw new Error('Impressora não encontrada');
    impressora.reativar();
    await this.impressoraRepository.salvar(impressora);
  }

  async listarTodos(filtro?: IImpressoraFiltro): Promise<Impressora[]> {
    return this.impressoraRepository.listar(filtro);
  }
}
