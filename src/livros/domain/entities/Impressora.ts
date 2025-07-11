export type Categoria = string;
export type Tecnologia = 'FDM' | 'SLA' | 'SLS' | 'DLP';

export type ImpressoraUpdateProps = {
  marca?: string;
  modelo?: string;
  precoCusto?: number;
  precoVenda?: number;
  tecnologia?: Tecnologia;
  categorias?: Categoria[];
};

export class Impressora {
  private readonly id: string;
  private marca: string;
  private modelo: string;
  private tecnologia: Tecnologia;
  private precoCusto: number;
  private precoVenda!: number;
  private categorias: Categoria[];
  private ativo: boolean;
  private justificativaStatus?: string;

  constructor(
    id: string,
    marca: string,
    modelo: string,
    tecnologia: Tecnologia,
    precoCusto: number,
    precoVenda: number,
    categorias: Categoria[],
  ) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.tecnologia = tecnologia;
    this.precoCusto = precoCusto;
    this.setPrecoVenda(precoVenda);
    this.categorias = categorias;
    this.ativo = true;
  }

  // ====== Encapsulamento de regras ======
  public setPrecoVenda(preco: number) {
    const margemMinima = 0.1; // 10%
    if (preco < this.precoCusto * (1 + margemMinima)) {
      throw new Error('Preço de venda abaixo da margem mínima permitida.');
    }
    this.precoVenda = preco;
  }

  public inativar(justificativa: string) {
    if (!justificativa) {
      throw new Error('Justificativa obrigatória para inativar.');
    }
    this.ativo = false;
    this.justificativaStatus = justificativa;
  }

  public reativar() {
    this.ativo = true;
    this.justificativaStatus = undefined;
  }

  public alterarDados(dados: ImpressoraUpdateProps) {
    if (dados.marca) this.marca = dados.marca;
    if (dados.modelo) this.modelo = dados.modelo;
    if (dados.tecnologia) this.tecnologia = dados.tecnologia;
    if (dados.precoCusto !== undefined) this.precoCusto = dados.precoCusto;
    if (dados.precoVenda !== undefined) this.setPrecoVenda(dados.precoVenda);
    if (dados.categorias) this.categorias = dados.categorias;
  }

  // ====== Getters públicos ======
  public getId(): string {
    return this.id;
  }

  public getMarca(): string {
    return this.marca;
  }

  public getModelo(): string {
    return this.modelo;
  }

  public getTecnologia(): Tecnologia {
    return this.tecnologia;
  }

  public getPrecoCusto(): number {
    return this.precoCusto;
  }

  public getPrecoVenda(): number {
    return this.precoVenda;
  }

  public getCategorias(): Categoria[] {
    return this.categorias;
  }

  public getAtivo(): boolean {
    return this.ativo;
  }

  public getJustificativaStatus(): string | undefined {
    return this.justificativaStatus;
  }
}
