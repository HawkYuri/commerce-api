import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Livro } from '../domain/entities/Livro';
import {
  ILivroRepositoryToken,
  ILivroRepository,
  ILivroFiltro,
} from '../domain/repositories/ILivroRepository';
import { CreateLivroDto } from '../presentation/dtos/create-livro.dto';

@Injectable()
export class LivroService {
  constructor(
    @Inject(ILivroRepositoryToken)
    private readonly livroRepository: ILivroRepository,
  ) {}

  async criar(dto: CreateLivroDto): Promise<Livro> {
    const livro = new Livro(
      uuidv4(),
      dto.titulo,
      dto.autor,
      dto.isbn,
      dto.precoCusto,
      dto.precoVenda,
      dto.categorias,
    );

    await this.livroRepository.salvar(livro);
    return livro;
  }

  async buscarPorId(id: string): Promise<Livro | null> {
    return this.livroRepository.buscarPorId(id);
  }

  async atualizar(id: string, dados: Partial<CreateLivroDto>): Promise<void> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) throw new Error('Livro não encontrado');

    livro.alterarDados(dados);
    await this.livroRepository.salvar(livro);
  }

  async inativar(id: string, justificativa: string): Promise<void> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) throw new Error('Livro não encontrado');

    livro.inativar(justificativa);
    await this.livroRepository.salvar(livro);
  }

  async reativar(id: string): Promise<void> {
    const livro = await this.livroRepository.buscarPorId(id);
    if (!livro) throw new Error('Livro não encontrado');

    livro.reativar();
    await this.livroRepository.salvar(livro);
  }

  async listarTodos(filtro?: ILivroFiltro): Promise<Livro[]> {
    return this.livroRepository.listar(filtro);
  }
}
