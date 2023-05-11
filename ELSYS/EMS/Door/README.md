# ELSYS EMS Door

Indoor LoRaWAN contact sensor for detecting door open/closing with an accelerometer.

[Operating Manual](https://elsys.se/public/manuals/Operating%20_Manual_EMS_Door.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_CO2_datasheet.pdf)  

## Assets
| Name            | Title             | Unit | Data Type | Asset Type | Description                                                     |
| --------------- | ----------------- | ---- | --------- | ---------- | --------------------------------------------------------------- |
| digital         | Digital           | -    | boolean   | sensor     | Door sensor (reed switch)                                       |
| acceleration        | Acceleration          | -    | object    | sensor     | Acceleration in space. The asset is an object with X, Y and Z axis. |
| motion          | Motion            | -    | integer   | sensor     | Amount of motion detected by the accelerometer                  |
| pulse_count_abs | Pulse Count (Absolute) | -    | integer   | sensor     | Amount of times the door has been opened.                       |
| battery         | Battery Voltage   | V    | number    | sensor     | Battery voltage reading                                         |


## Example Payloads
`03013FFA070E0F0B000007F40D010F00`  
`03003FF9070E140B000007F40D010F00`  