# Ingics iBS04 Bluetooth Tag

> Tag Type: 10 *(via Digital Matter)*  
> Payload size: 11 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Battery Voltage | battery_voltage | sensor | number | V | |
| Button | button | sensor | boolean | | |
| Moving | moving | sensor | boolean | | |
| Hall Effect | hall_effect | sensor | boolean | | |
| User Data 0 | user_data_0 | sensor | integer | | |
| User Data 1 | user_data_1 | sensor | integer | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- ``