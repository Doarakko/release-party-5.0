import fetch from 'node-fetch';

export type Color = {
  x: number;
  y: number;
};

export default class Philips {
  private readonly ipAddress: string;
  private readonly username: string;

  constructor(ipAddress: string, username: string) {
    this.ipAddress = ipAddress;
    this.username = username;
  }

  public async turnOn(deviceId: string, color: Color): Promise<void> {
    const response = await fetch(
      `http://${this.ipAddress}/api/${this.username}/lights/${deviceId}/state`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          on: true,
          xy: [color.x, color.y],
          bri: 254,
          sat: 254
        })
      }
    );

    // console.log(response.statusText);
  }

  public async turnOff(deviceId: string): Promise<void> {
    const response = await fetch(
      `http://${this.ipAddress}/api/${this.username}/lights/${deviceId}/state`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          on: false
        })
      }
    );

    // console.log(response.statusText);
  }
}
