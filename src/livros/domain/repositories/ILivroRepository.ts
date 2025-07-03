import { Livro } from '../entities/Livro';

export const ILivroRepositoryToken = Symbol('ILivroRepository');

export interface ILivroRepository {
  salvar(livro: Livro): Promise<void>;
  buscarPorId(id: string): Promise<Livro | null>;
  listar(): Promise<Livro[]>;
}
