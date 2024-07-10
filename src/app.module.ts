import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from './core/domain/.module';
import { DomainModule } from './core/domain/domain.module';

@Module({
  imports: [Module, DomainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
