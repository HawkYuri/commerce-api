import { Module } from '@nestjs/common';
import { ImpressoraService } from './livros/application/ImpressoraService';
import { IImpressoraRepositoryToken } from './livros/domain/repositories/IImpressoraRepository';
import { ImpressoraRepositoryInMemory } from './livros/infrastructure/ImpressoraRepositoryInMemory';
import { ImpressoraController } from './livros/presentation/controllers/ImpressoraController';

@Module({
  controllers: [ImpressoraController],
  providers: [
    ImpressoraService,
    {
      provide: IImpressoraRepositoryToken,
      useClass: ImpressoraRepositoryInMemory,
    },
  ],
})
export class AppModule {}
