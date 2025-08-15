import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import { Signal } from "./schemas/signal.schema";
import { QuerySignalDto } from "./dto/query-signal.dto";
import { CreateSignalDto } from "./dto/create-signal.dto";
import { UpdateSignalDto } from "./dto/update-signal.dto";

@Injectable()
export class SignalsService {
  private readonly logger = new Logger(SignalsService.name);

  constructor(@InjectModel(Signal.name) private model: Model<Signal>) {}

  async ingestXrayMessage(msg: any) {
    // {
    //   "<deviceId>": {
    //     data: [[timeOffset, [lat, lon, speed]], ...],
    //     time: <timestamp(ms)>
    //   }
    // }

    if (!msg || typeof msg !== "object") return;

    const deviceId = Object.keys(msg)[0];
    const payload = msg[deviceId];

    if (!deviceId || !payload) return;

    const time: number = payload.time;
    const data: any[] = Array.isArray(payload.data) ? payload.data : [];

    const dataLength = data.length;
    const dataVolume = Buffer.byteLength(JSON.stringify(payload), "utf8");

    let maxSpeed: number | undefined;
    let avgSpeed: number | undefined;
    if (dataLength > 0) {
      const speeds: number[] = data
        .map((row) =>
          Array.isArray(row) && Array.isArray(row[1])
            ? Number(row[1][2])
            : undefined,
        )
        .filter((v) => typeof v === "number");

      if (speeds.length > 0) {
        maxSpeed = Math.max(...speeds);
        avgSpeed = Math.round(
          speeds.reduce((a, b) => a + b, 0) / speeds.length,
        );
      }
    }

    await this.model.updateOne(
      { deviceId, time } as FilterQuery<Signal>,
      {
        $set: {
          deviceId,
          time,
          dataLength,
          dataVolume,
          ...(maxSpeed !== undefined ? { maxSpeed } : {}),
          ...(avgSpeed !== undefined ? { avgSpeed } : {}),
        },
      },
      { upsert: true },
    );
  }

  // -------- CRUD & Query --------
  async create(dto: CreateSignalDto) {
    return this.model.create(dto);
  }

  async findAll(q: QuerySignalDto) {
    const { deviceId, timeFrom, timeTo, page = 1, limit = 20 } = q;

    const filter: FilterQuery<Signal> = {};
    if (deviceId) filter.deviceId = deviceId;
    if (timeFrom || timeTo) {
      filter.time = {};
      if (timeFrom) filter.time.$gte = timeFrom;
      if (timeTo) filter.time.$lte = timeTo;
    }

    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.model.find(filter).sort({ time: -1 }).skip(skip).limit(limit).lean(),
      this.model.countDocuments(filter),
    ]);

    return {
      total,
      page,
      limit,
      items,
    };
  }

  async findOne(id: string) {
    return this.model.findById(id);
  }

  async update(id: string, dto: UpdateSignalDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  async remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
