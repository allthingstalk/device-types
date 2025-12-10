# ELSYS ERS CO2 Lite

> Device Type: `elsys/ers-co2-lite`  

Needs to be calibrated on fresh air on first use. This is done using the smartphone app that sends it a command to initiate calibration via NFC.  
The natural level of carbon dioxide (CO2) is around 400 ppm (parts per million) in the outdoor environment.  
It has an internal automatic baseline calibration (ABC) routine. The ABC routine takes the lowest value read in eight days and sets it to 400 ppm. For this to work correctly, the sensor must be exposed to well-ventilated air at least once every eight days.
It is worth to mention that it takes the ABC approximately one month before it has calibrated the sensor enough to give you correct values. When you first receive your sensor, it can show strange values due to mechanical stress from the transport. If you do a manual calibration before installing the sensor, you will receive correct values instantly.  
If there are people present 24/7, we recommend that you turn off the ABC and manually calibrate the sensor once a year. To do so, you need to take the sensor outside for about 10 minutes.
  
Range: 0 –10000 ppm  
Accuracy: ± 50 ppm / ± 3% of reading  
Noise: 14 ppm @ 400 ppm / 25 ppm @ 1000 ppm  

## Assets
| Name        | Title           | Unit | Data Type | Asset Type |
| ----------- | --------------- | ---- | --------- | ---------- |
| co2         | CO2             | ppm  | integer   | sensor     |
| light       | Light Level     | Lux  | integer   | sensor     |
| humidity    | Humidity        | %    | integer   | sensor     |
| temperature | Temperature     | °C   | number    | sensor     |
| battery     | Battery Voltage | V    | number    | sensor     |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator |

## Rules
| Rule                            | Notification Body                                                                                                                       | State    | Notifies via | People Notified |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------ | --------------- |
| If Battery Voltage <= 3.0 Volts | {{{{deviceId}}/%title}} battery voltage is low at {{{{deviceId}}/battery}}V! Replace the battery as soon as possible to avoid downtime. | Enabled  | Web + E-Mail | Owner           |
| If CO2 >= 1800 ppm              | {{{{deviceId}}/%title}} detected CO2 levels above 1800ppm!                                                                              | Disabled | Web + E-Mail | Owner           |
| If CO2 >= 2300 ppm              | CRITICAL: {{{{deviceId}}/%title}} detected CO2 levels above 2300ppm!                                                                    | Enabled  | Web + E-Mail | Owner           |
| Watchdog, 30 minutes            | -                                                                                                                                       | Enabled  | Web + E-Mail | Owner           |
