import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class FiltroImpressoraDto {
  @IsOptional()
  @IsString()
  marca?: string;

  @IsOptional()
  @IsString()
  modelo?: string;

  @IsOptional()
  @IsString()
  tecnologia?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsBooleanString()
  ativo?: string; // ainda será string porque vem da query (?ativo=true)
}
