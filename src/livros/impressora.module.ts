// src/livros/livro.module.ts
import { Module } from '@nestjs/common';
import { ImpressoraController } from './presentation/controllers/ImpressoraController';
import { ImpressoraService } from './application/ImpressoraService';
import { ImpressoraRepositoryInMemory } from './infrastructure/ImpressoraRepositoryInMemory';
import { IImpressoraRepositoryToken } from './domain/repositories/IImpressoraRepository';

@Module({
  controllers: [ImpressoraController],
  providers: [
    ImpressoraService,
    { provide: IImpressoraRepositoryToken, useClass: ImpressoraRepositoryInMemory },
  ],
})
export class ImpressoraModule {}
