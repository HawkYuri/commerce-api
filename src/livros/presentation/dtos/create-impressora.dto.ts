import { IsArray, IsNotEmpty, IsNumber, IsString, Min, ArrayNotEmpty, IsIn } from 'class-validator';

const TECNOLOGIAS = ['FDM', 'SLA', 'SLS', 'DLP'] as const;

export class CreateImpressoraDto {
  @IsNotEmpty()
  @IsString()
  marca!: string;

  @IsNotEmpty()
  @IsString()
  modelo!: string;

  @IsNotEmpty()
  @IsIn(TECNOLOGIAS)
  tecnologia!: (typeof TECNOLOGIAS)[number];

  @IsNumber()
  @Min(0)
  precoCusto!: number;

  @IsNumber()
  @Min(0)
  precoVenda!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categorias!: string[];
}
