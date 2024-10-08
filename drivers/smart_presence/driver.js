'use strict';

const Homey = require('homey');
const net = require("net");

module.exports = class SmartPresenceDriver extends Homey.Driver {

  onInit() {
    this.log('SmartPresence driver has been initialized');
    const devices = this.getDevices();
    devices.forEach(device => {
      const settings = device.getSettings();
      this.log(`Device Settings for ${device.getName()}:`, {
        Host: settings.host,
        Port: settings.port,
        'Away Delay': `${settings.away_delay} seconds`,
        'Normal Mode Check Interval': `${settings.normal_mode_interval} ms`,
        'Normal Mode Timeout': `${settings.host_timeout} seconds`,
        'Stress Period': `${settings.start_stressing_at} seconds`,
        'Stress Mode Check Interval': `${settings.stress_mode_interval} ms`,
        'Stress Host Timeout': `${settings.stress_host_timeout} seconds`
      });
    })
  }

  async onPair(session) {
    session.setHandler('device_input', async (data) => {
      //this.log('device_input', data);
      if (!data.devicename) {
        throw new Error(this.homey.__('pair.configuration.invalid_device_name'));
      } else if (!data.ip_address) {
        throw new Error(this.homey.__('pair.configuration.missing_ip_address'));
      } else if (!net.isIP(data.ip_address)) {
        throw new Error(this.homey.__('pair.configuration.invalid_ip_address'));
      }
    });
  }

};


