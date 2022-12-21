# ELSYS EMS Series of Sensors

## Sensing Abilities

| EMS                             | EMS Desk         | EMS Door                        | EMS Lite         |
| ------------------------------- | ---------------- | ------------------------------- | ---------------- |
| Temperature (°C)                | Temperature (°C) | Temperature (°C)                | Temperature (°C) |
| Humidity (% RH)                 | Humidity (% RH)  | Humidity (% RH)                 | Humidity (% RH)  |
|                                 | Occupancy        |                                 |                  |
| Motion (based on accelerometer) |                  | Motion (based on accelerometer) |                  |
| Water Leak                      |                  |                                 | Water Leak       |
| Contact (Door/Digital)          |                  | Contact (Door/Digital)          |                  |
| Position in space               |                  | Position in space               |                  |


## Device Configuration

- [Device Settings Parameters](https://elsys.se/public/documents/sensor_settings_parameter.pdf)
- [Device Payload Structure and Info](https://elsys.se/public/documents/Elsys-LoRa-payload.pdf)

All sensor settings can be configured via a smartphone application with NFC (Near Field Communication) or over the air via the network server and downlink data to the sensor. The sampling rate, spreading factor, encryption keys, port,and modes can be changed. All sensor settings can be locked from the server or NFCto make end-users unable toread or change settings on the sensor. 

1. Download ELSYS “Sensor Settings” application from Google Play or App Store (from iOS 13) and install it on a smartphone or tablet. The device must support NFC.
2. Enable NFC on the device and start the application.
3. Place your device on top of the NFC antenna on the sensor.
4. Remove the device. Current settings will be displayed in the application.
5. Use the application to change any settings if needed.
6. Quickly tap the device on top of the NFC antenna to give the new settings to the sensor. Make sure that the application confirms your new settings.
7. Wait for the sensor to reboot (5 sec), indicated by the LED flashing. Sensor settings have been updated


## Over-the-air Configuration

All settings may be configured over the air via your LoRaWAN® infrastructure. 
[Use the downlink generator.](https://www.elsys.se/en/downlink-generator/)

