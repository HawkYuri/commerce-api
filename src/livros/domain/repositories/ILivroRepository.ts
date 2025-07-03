import { Livro } from '../entities/Livro';

export const ILivroRepositoryToken = Symbol('ILivroRepository');

export interface ILivroFiltro {
  titulo?: string;
  autor?: string;
  categoria?: string;
  ativo?: boolean;
}
export interface ILivroRepository {
  salvar(livro: Livro): Promise<void>;
  buscarPorId(id: string): Promise<Livro | null>;
  listar(filtro?: ILivroFiltro): Promise<Livro[]>;
}
