import { Impressora } from '../entities/Impressora';

export const IImpressoraRepositoryToken = 'IImpressoraRepository';

export interface IImpressoraFiltro {
  marca?: string;
  modelo?: string;
  tecnologia?: string;
  categoria?: string;
  ativo?: boolean;
}

export interface IImpressoraRepository {
  salvar(impressora: Impressora): Promise<void>;
  buscarPorId(id: string): Promise<Impressora | null>;
  listar(filtro?: IImpressoraFiltro): Promise<Impressora[]>;
}
