import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { RabbitSubscribe } from "@golevelup/nestjs-rabbitmq";
import { SignalsService } from "../signals/signals.service";

@Injectable()
export class XrayConsumer {
  private readonly logger = new Logger(XrayConsumer.name);
  private readonly queueName: string;

  constructor(
    private readonly cfg: ConfigService,
    private readonly signals: SignalsService,
  ) {
    this.queueName = this.cfg.get<string>("RABBITMQ_XRAY_QUEUE") || "x-ray";
  }

  @RabbitSubscribe({
    exchange: "",
    routingKey: process.env.RABBITMQ_XRAY_QUEUE || "x-ray",
    queue: process.env.RABBITMQ_XRAY_QUEUE || "x-ray",
    queueOptions: { durable: true },
  })
  public async handleXrayMessage(msg: any) {
    try {
      this.logger.log(`Received x-ray message → processing...`);
      await this.signals.ingestXrayMessage(msg);
      this.logger.log(`Saved/Upserted x-ray doc`);
    } catch (e) {
      this.logger.error("Consumer error", e.stack);
    }
  }
}
