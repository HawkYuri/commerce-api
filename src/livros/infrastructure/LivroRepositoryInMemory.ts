// src/livros/infrastructure/LivroRepositoryInMemory.ts
import { Injectable } from '@nestjs/common';
import { Livro } from '../domain/entities/Livro';
import { ILivroFiltro, ILivroRepository } from '../domain/repositories/ILivroRepository';

@Injectable()
export class LivroRepositoryInMemory implements ILivroRepository {
  private livros: Livro[] = [];

  async salvar(livro: Livro): Promise<void> {
    const index = this.livros.findIndex((l) => l.getId() === livro.getId());
    if (index !== -1) {
      this.livros[index] = livro;
    } else {
      this.livros.push(livro);
    }
    void (await Promise.resolve());
  }

  async buscarPorId(id: string): Promise<Livro | null> {
    return Promise.resolve(this.livros.find((l) => l.getId() === id) ?? null);
  }

  async listar(filtro?: ILivroFiltro): Promise<Livro[]> {
    return Promise.resolve(
      this.livros.filter((livro) => {
        if (
          filtro?.titulo &&
          !livro.getTitulo().toLowerCase().includes(filtro.titulo.toLowerCase())
        ) {
          return false;
        }
        if (filtro?.autor && !livro['autor'].toLowerCase().includes(filtro.autor.toLowerCase())) {
          return false;
        }
        if (filtro?.categoria && !livro['categorias'].includes(filtro.categoria)) {
          return false;
        }
        if (filtro?.ativo !== undefined && livro.getAtivo() !== filtro.ativo) {
          return false;
        }
        return true;
      }),
    );
  }
}
