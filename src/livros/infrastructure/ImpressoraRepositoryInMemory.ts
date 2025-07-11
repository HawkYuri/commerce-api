import { Injectable } from '@nestjs/common';
import { Impressora } from '../domain/entities/Impressora';
import {
  IImpressoraRepository,
  IImpressoraFiltro,
} from '../domain/repositories/IImpressoraRepository';

@Injectable()
export class ImpressoraRepositoryInMemory implements IImpressoraRepository {
  private impressoras: Impressora[] = [];

  async salvar(impressora: Impressora): Promise<void> {
    const index = this.impressoras.findIndex((i) => i.getId() === impressora.getId());
    if (index !== -1) {
      this.impressoras[index] = impressora;
    } else {
      this.impressoras.push(impressora);
    }
    await Promise.resolve().catch(() => {});
  }

  async buscarPorId(id: string): Promise<Impressora | null> {
    return await Promise.resolve(this.impressoras.find((i) => i.getId() === id) || null);
  }

  async listar(filtro?: IImpressoraFiltro): Promise<Impressora[]> {
    return await Promise.resolve(
      this.impressoras.filter((impressora) => {
        return (
          (!filtro?.marca || impressora.getMarca() === filtro.marca) &&
          (!filtro?.modelo || impressora.getModelo() === filtro.modelo) &&
          (!filtro?.tecnologia || impressora.getTecnologia() === filtro.tecnologia) &&
          (!filtro?.categoria || impressora.getCategorias().includes(filtro.categoria)) &&
          (filtro?.ativo === undefined || impressora.getAtivo() === filtro.ativo)
        );
      }),
    );
  }
}
