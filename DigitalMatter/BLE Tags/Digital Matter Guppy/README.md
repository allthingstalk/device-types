# Digital Matter Guppy Bluetooth Tag

> Tag Type: 0 *(via Digital Matter)*  
> Payload size: 7 bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Transmit Power | tx_power | sensor | integer | dBm | |
| Battery Voltage | battery_voltage | sensor | number | V | |
| Internal Temperature | internal_temperature | sensor | integer | °C | |
| MAC Address (optional) | mac_address | sensor | string | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads