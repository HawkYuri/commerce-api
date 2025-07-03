export type Categoria = string;

export class Livro {
  private readonly id: string;
  private titulo: string;
  private autor: string;
  private isbn: string;
  private precoCusto: number;
  private precoVenda: number;
  private categorias: Categoria[];
  private ativo: boolean;
  private justificativaStatus?: string;

  constructor(
    id: string,
    titulo: string,
    autor: string,
    isbn: string,
    precoCusto: number,
    precoVenda: number,
    categorias: Categoria[],
  ) {
    this.id = id;
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.precoCusto = precoCusto;
    this.setPrecoVenda(precoVenda);
    this.categorias = [...categorias];
    this.ativo = true;
  }

  public getId() {
    return this.id;
  }

  public getTitulo() {
    return this.titulo;
  }

  public getAtivo() {
    return this.ativo;
  }

  public getJustificativaStatus() {
    return this.justificativaStatus;
  }

  public setPrecoVenda(preco: number) {
    const margemMinima = 0.1; // 10%
    if (preco < this.precoCusto * (1 + margemMinima)) {
      throw new Error('Preço de venda abaixo da margem mínima permitida.');
    }
    this.precoVenda = preco;
  }

  public inativar(justificativa: string) {
    if (!justificativa) {
      throw new Error('Justificativa obrigatória para inativar o livro.');
    }
    this.ativo = false;
    this.justificativaStatus = justificativa;
  }

  public reativar() {
    this.ativo = true;
    this.justificativaStatus = undefined;
  }

  public alterarDados(dados: LivroUpdateProps) {
    if (dados.titulo) this.titulo = dados.titulo;
    if (dados.autor) this.autor = dados.autor;
    if (dados.isbn) this.isbn = dados.isbn;
    if (dados.precoCusto !== undefined) this.precoCusto = dados.precoCusto;
    if (dados.precoVenda !== undefined) this.setPrecoVenda(dados.precoVenda);
    if (dados.categorias) this.categorias = [...dados.categorias];
  }

  public getAutor() {
    return this.autor;
  }

  public getIsbn() {
    return this.isbn;
  }

  public getPrecoVenda() {
    return this.precoVenda;
  }

  public getPrecoCusto() {
    return this.precoCusto;
  }

  public getCategorias() {
    return [...this.categorias]; // retorna cópia para evitar mutação externa
  }
}

export type LivroUpdateProps = {
  titulo?: string;
  autor?: string;
  isbn?: string;
  precoCusto?: number;
  precoVenda?: number;
  categorias?: Categoria[];
};
