# ELA T Bluetooth Tag

> Tag Type: 15 *(via Digital Matter)*  
> Payload size: 23 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| Temperature | temperature | sensor | number | °C | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- ``