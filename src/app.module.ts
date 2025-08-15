import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CacheModule } from '@nestjs/cache-manager';
import { SignalsModule } from './signals/signals.module';
import { RabbitModule } from './rabbit/rabbit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    CacheModule.register({
      isGlobal: true,
      ttl: 10,
      max: 100, 
    }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>('MONGO_URI'),
      }),
    }),

    SignalsModule,
    RabbitModule,
  ],
})
export class AppModule {}
