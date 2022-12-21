# ELSYS EMS

Indoor LoRaWAN door and leak sensor with additional temperature, humidity and acceleration
celeration sensors + NFC for configuration.

[Operating Manual](https://www.elsys.se/public/manuals/Operating_Manual_EMS_Lite.pdf)  
[Datasheet](https://elsys.se/public/datasheets/EMS_lite_datasheet.pdf)  

## Assets

| Name            | Title                      | Unit | Data Type | Asset Type | Description                                                    |
| --------------- | -------------------------- | ---- | --------- | ---------- | -------------------------------------------------------------- |
| digital         | Digital                    | -    | boolean   | sensor     | Door reed switch sensor                                        |
| water-leak      | Water Leak                 | -    | integer   | sensor     | Water leak pads on the bottom of the device                    |
| temperature     | Temperature                | °C   | number    | sensor     | Ambient temperature                                            |
| humidity        | Humidity                   | %    | integer   | sensor     | Ambient humidity                                               |
| position        | Position (Object: X, Y, Z) | -    | object    | sensor     | Position in space, XYZ axis                                    |
| battery         | Battery Voltage            | V    | number    | sensor     | Voltage of the battery                                         |
| motion          | Motion                     | -    | integer   | sensor     | The amount of motion detected (CHECK THIS?)                    |
| pulse-count-abs | Pulse Count (ABS)          | -    | integer   | sensor     | Amount of times the door has been opened (digital asset above) |

