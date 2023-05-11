# ELSYS EMS

Indoor LoRaWAN door and leak sensor with additional temperature, humidity and acceleration
celeration sensors + NFC for configuration.

[Operating Manual](https://www.elsys.se/public/manuals/Operating_Manual_EMS_Lite.pdf)  
[Datasheet](https://elsys.se/public/datasheets/EMS_lite_datasheet.pdf)  

## Assets

| Name            | Title                      | Unit | Data Type | Asset Type | Description                                                    |
| --------------- | -------------------------- | ---- | --------- | ---------- | -------------------------------------------------------------- |
| digital         | Digital                    | -    | boolean   | sensor     | Door reed switch sensor                                        |
| water_leak      | Water Leak                 | -    | integer   | sensor     | Water leak pads on the bottom of the device                    |
| temperature     | Temperature                | °C   | number    | sensor     | Ambient temperature                                            |
| humidity        | Humidity                   | %    | integer   | sensor     | Ambient humidity                                               |
| acceleration        | Acceleration | -    | object    | sensor     | Acceleration in on XYZ axis, needs to be an object                                    |
| battery         | Battery Voltage            | V    | number    | sensor     | Voltage of the battery                                         |
| motion          | Motion                     | -    | integer   | sensor     | The amount of motion detected (CHECK THIS?)                    |
| pulse_count_abs | Pulse Count (Absolute)          | -    | integer   | sensor     | Amount of times the door has been opened (digital asset above) |

