# EMS Desk

LoRaWAN sensor that detects occupancy using a body heat sensor (most likely a grid-eye IR sensor) and has temperature, humidity and acceleration sensors + NFC.

[Operating Manual](https://www.elsys.se/public/manuals/Operating_Manual_EMS_Desk.pdf)  
[Datasheet](https://elsys.se/public/datasheets/EMS_Desk_datasheet.pdf)  

Occupancy Payload Definition:  
0: Nobody  
1: Entering/Leaving  
2: Occupied (Grid-Eye Sensor Triggered)  

## Assets
| Name                 | Title                | Unit | Data Type | Asset Type | Description                                                                          |
| -------------------- | -------------------- | ---- | --------- | ---------- | ------------------------------------------------------------------------------------ |
| occupancy            | Occupancy            | -    | integer   | sensor     | Occupancy, where 1 is entering/leaving and 2 is occupied                             |
| ir_internal_temperature | IR Internal Temperature | °C   | integer   | sensor     | Internal temperature of the sensor. Probably used to calibrate the occupancy sensor. |
| ir_external_temperature | IR External Temperature | °C   | integer   | sensor     | External temperature (TODO - REPORTED THAT IT DOESNT EXIST)                          |
| battery      | Battery Voltage      | V    | number    | sensor     | Voltage of the battery                                                              |

