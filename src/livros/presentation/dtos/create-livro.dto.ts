import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  IsArray,
  ArrayNotEmpty,
  Matches,
} from 'class-validator';

export class CreateLivroDto {
  @IsNotEmpty()
  @IsString()
  titulo!: string;

  @IsNotEmpty()
  @IsString()
  autor!: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?:\d{9}[\dXx]|\d{13})$/, { message: 'ISBN inválido' })
  isbn!: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precoCusto!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  precoVenda!: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categorias!: string[];
}
