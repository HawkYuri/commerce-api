// src/livros/infrastructure/LivroRepositoryInMemory.ts
import { Injectable } from '@nestjs/common';
import { Livro } from '../domain/entities/Livro';
import { ILivroRepository } from '../domain/repositories/ILivroRepository';

@Injectable()
export class LivroRepositoryInMemory implements ILivroRepository {
  private livros: Map<string, Livro> = new Map();

  async salvar(livro: Livro): Promise<void> {
    void (await Promise.resolve(this.livros.set(livro.getId(), livro)));
  }

  async buscarPorId(id: string): Promise<Livro | null> {
    return Promise.resolve(this.livros.get(id) ?? null);
  }
  async listar(): Promise<Livro[]> {
    return Promise.resolve(Array.from(this.livros.values()));
  }
}
