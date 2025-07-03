// src/livros/livro.module.ts
import { Module } from '@nestjs/common';
import { LivroController } from './presentation/controllers/LivroController';
import { LivroService } from './application/LivroService';
import { LivroRepositoryInMemory } from './infrastructure/LivroRepositoryInMemory';
import { ILivroRepositoryToken } from './domain/repositories/ILivroRepository';

@Module({
  controllers: [LivroController],
  providers: [LivroService, { provide: ILivroRepositoryToken, useClass: LivroRepositoryInMemory }],
})
export class LivroModule {}
