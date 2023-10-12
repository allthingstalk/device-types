# Ingics iBS01 Basic Bluetooth Tag

> Tag Type: 3 *(via Digital Matter)*  
> Payload size: 9 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Battery Voltage | battery_voltage | sensor | number | V | |
| Tag Flag 0 | tag_flag_0 | sensor | boolean | | |
| Tag Flag 1 | tag_flag_1 | sensor | boolean | | |
| Tag Flag 2 | tag_flag_2 | sensor | boolean | | |
| Tag Flag 3 | tag_flag_3 | sensor | boolean | | |
| Tag Flag 4 | tag_flag_4 | sensor | boolean | | |
| Tag Flag 5 | tag_flag_5 | sensor | boolean | | |
| Tag Flag 6 | tag_flag_6 | sensor | boolean | | |
| Tag Flag 7 | tag_flag_7 | sensor | boolean | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- ``