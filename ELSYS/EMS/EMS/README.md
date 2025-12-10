# ELSYS EMS

> Device Type: `elsys/ems`  

Indoor LoRaWAN door and leak sensor with additional temperature, humidity and acceleration
celeration sensors + NFC for configuration.

[Operating Manual](https://elsys.se/public/manuals/Operating%20Manual%20EMS.pdf)  
[Datasheet](https://elsys.se/public/datasheets/EMS_datasheet.pdf)  

## Assets

| Name            | Title                      | Unit | Data Type | Asset Type | Description                                                    |
| --------------- | -------------------------- | ---- | --------- | ---------- | -------------------------------------------------------------- |
| digital         | Door Closed                | -    | boolean   | sensor     | Door reed switch sensor                                        |
| water_leak      | Water Leak                 | -    | integer   | sensor     | Water leak pads on the bottom of the device                    |
| temperature     | Temperature                | °C   | number    | sensor     | Ambient temperature                                            |
| humidity        | Humidity                   | %    | integer   | sensor     | Ambient humidity                                               |
| acceleration    | Acceleration               | -    | object    | sensor     | Acceleration in on XYZ axis, needs to be an object. Check below. |
| battery         | Battery Voltage            | V    | number    | sensor     | Voltage of the battery                                         |
| acc_motion      | Accelerometer Motion       | -    | integer   | sensor     | The amount of motion detected by the accelerometer             |
| pulse_count_abs | Total Door Cycles          | -    | integer   | sensor     | Amount of times the door has been opened (digital asset above) |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator | |

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