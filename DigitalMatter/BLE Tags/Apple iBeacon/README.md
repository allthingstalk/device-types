# Apple iBeacon Bluetooth Tag

> Tag Type: 1 *(via Digital Matter)*  
> Payload Size: 21 bytes (no MAC Address) or 27 bytes (with MAC Address)

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Major ID | major_id | sensor | integer | | |
| Minor ID | minor_id | sensor | integer | | |
| Calibrated TX Power | calibrated_tx_power | sensor | integer | | |
| MAC Address (optional) | mac_address | sensor | string | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
> These are Base64 Encoded
- `/aUGk6TiT7Gvz8brB2R4JTAnAgDT`
