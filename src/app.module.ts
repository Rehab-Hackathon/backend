import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig, generalConfig } from './configs';
import { RektModule } from './modules/rekt/rekt.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import * as Path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig, dbConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [Path.join(__dirname, 'entities', '*.entity{.ts,.js}')],
        timezone: 'utc',
        synchronize: configService.get<boolean>('database.synchronize'),
        bigNumberStrings: false,
        logging: false,
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
    }),
    RektModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
