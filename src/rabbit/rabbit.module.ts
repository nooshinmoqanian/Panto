import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";
import { XrayConsumer } from "./xray.consumer";
import { SignalsModule } from "../signals/signals.module";

@Module({
  imports: [
    SignalsModule,
    RabbitMQModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        uri: cfg.get<string>("RABBITMQ_URI"),
        connectionInitOptions: { wait: true, timeout: 5000 },
      }),
    }),
  ],
  providers: [XrayConsumer],
})
export class RabbitModule {}
