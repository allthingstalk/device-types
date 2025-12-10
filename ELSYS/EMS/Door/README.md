# ELSYS EMS Door

> Device Type: `elsys/ems-door`  

Indoor LoRaWAN contact sensor for detecting door open/closing with an accelerometer.

[Operating Manual](https://elsys.se/public/manuals/Operating%20_Manual_EMS_Door.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_CO2_datasheet.pdf)  

## Assets
| Name            | Title             | Unit | Data Type | Asset Type | Description                                                     |
| --------------- | ----------------- | ---- | --------- | ---------- | --------------------------------------------------------------- |
| digital         | Door Closed        | -    | boolean   | sensor     | Door sensor (reed switch)                                       |
| acceleration        | Acceleration          | -    | object    | sensor     | Acceleration in space. The asset is an object with X, Y and Z axis. |
| acc_motion          | Accelerometer Motion       | -    | integer   | sensor     | Amount of motion detected by the accelerometer                  |
| pulse_count_abs | Total Door Cycles | -    | integer   | sensor     | Amount of times the door has been opened.                       |
| battery         | Battery Voltage   | V    | number    | sensor     | Battery voltage reading                                         |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator |

Acceleration Profile Type:
```
{
  "type": "object",
  "properties": {
    "x": {"type": "integer"},
    "y": {"type": "integer"},
    "z": {"type": "integer"}
  }
}
```

## Example Payloads
`03013FFA070E0F0B000007F40D010F00`  
`03003FF9070E140B000007F40D010F00`  