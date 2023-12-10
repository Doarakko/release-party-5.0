import { App, LogLevel } from '@slack/bolt';
import dotenv from 'dotenv';
import Philips from './philips';
import { setTimeout } from 'node:timers/promises';

dotenv.config();

const app = new App({
  appToken: process.env.SLACK_APP_TOKEN,
  token: process.env.SLACK_BOT_TOKEN,
  logLevel: LogLevel.WARN,
  socketMode: true
});

const philips = new Philips(
  process.env.PHILIPS_IP_ADDRESS || '',
  process.env.PHILIPS_USERNAME || ''
);

const philipsDeviceId = process.env.PHILIPS_DEVICE_ID || '';

app.message(async ({ client, message }) => {
  // console.log(message);

  if (message.subtype != 'bot_message') {
    return;
  }

  switch (message.text) {
    case 'release completed':
      break;
    case 'release completed':
      break;
    default:
      return;
  }

  _philipsColorful(philips, philipsDeviceId);

  await client.reactions.add({
    channel: message.channel,
    timestamp: message.ts,
    name: 'tada'
  });
});

app.event('app_mention', async ({ say }) => {
  await say(`Shut up.`);
});

// https://developers.meethue.com/develop/get-started-2/core-concepts/
const philipsColorYellow = { x: 0.4325, y: 0.5007 };
const philipsColorBlue = { x: 0.167, y: 0.04 };
const philipsColorRed = { x: 0.675, y: 0.322 };
const philipsColorGreen = { x: 0.4091, y: 0.518 };

async function _philipsColorful(
  client: Philips,
  device_id: string
): Promise<void> {
  await client.turnOn(device_id, philipsColorGreen);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorRed);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorYellow);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorBlue);
  await setTimeout(1000 * 0.5);

  await client.turnOn(device_id, philipsColorGreen);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorRed);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorYellow);
  await setTimeout(1000 * 0.5);
  await client.turnOn(device_id, philipsColorBlue);
  await setTimeout(1000 * 0.5);

  await client.turnOff(device_id);
}

(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();
