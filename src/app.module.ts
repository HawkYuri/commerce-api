import { Module } from '@nestjs/common';
import { LivroModule } from './livros/livro.module';

@Module({
  imports: [LivroModule],
})
export class AppModule {}
