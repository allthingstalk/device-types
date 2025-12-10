# EMS Desk

> Device Type: `elsys/ems-desk`  

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
| temperature          | Temperature          | °C   | number    | sensor     | Temperature                                                                          |
| humidity             | Humidity             | %    | number    | sensor     | Humidity                                                                             |
| battery              | Battery Voltage      | V    | number    | sensor     | Voltage of the battery                                                               |

