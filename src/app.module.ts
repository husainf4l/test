import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OracleService } from './oracle/oracle.service';
import { OracleController } from './oracle/oracle.controller';
import { ConfigModule } from '@nestjs/config';
import { OracleModule } from './oracle/oracle.module';

@Module({
  imports: [ConfigModule.forRoot(), OracleModule],
  controllers: [AppController, OracleController,],
  providers: [AppService, OracleService],
})
export class AppModule { }
