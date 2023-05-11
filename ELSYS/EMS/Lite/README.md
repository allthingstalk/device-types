# ELSYS EMS Lite

LoRaWAN leak detection sensor with temperature and humidity sensors as well.  

[Operating Manual](https://www.elsys.se/public/manuals/Operating_Manual_EMS_Lite.pdf)  
[Datasheet](https://elsys.se/public/datasheets/EMS_lite_datasheet.pdf)  

## Assets
| Name        | Title           | Unit | Data Type | Asset Type |                                                     |
| ----------- | --------------- | ---- | --------- | ---------- | --------------------------------------------------- |
| water_leak  | Water Leak      | -    | integer   | sensor     | The amount of water leakage detected (conductivity) |
| temperature | Temperature     | °C   | numberr   | sensor     | Ambient temperature                                 |
| humidity    | Humidity        | %    | integer   | sensor     | Ambient humidity                                    |
| battery     | Battery Voltage | V    | number    | sensor     | Battery voltage level                               |

