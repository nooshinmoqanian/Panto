import 'dotenv/config';
import fs from 'fs';
import amqp from 'amqplib';

const uri = process.env.RABBITMQ_URI || 'amqp://guest:guest@localhost:5672';
const queue = process.env.RABBITMQ_XRAY_QUEUE || 'x-ray';
const delay = Number(process.env.BATCH_DELAY_MS || 150);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  const conn = await amqp.connect(uri);
  const ch = await conn.createChannel();
  await ch.assertQueue(queue, { durable: true });

  const raw = fs.readFileSync(new URL('./sample.json', import.meta.url), 'utf8');
  const payload = JSON.parse(raw);

  for (let i = 0; i < 5; i++) {
    ch.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });
    console.log(`Sent message #${i + 1}`);
    await sleep(delay);
  }

  setTimeout(async () => {
    await ch.close();
    await conn.close();
    process.exit(0);
  }, 200);
})();
