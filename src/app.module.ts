import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HTTPModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [HTTPModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
