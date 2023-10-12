# ELA MAG Bluetooth Tag

> Tag Type: 11 *(via Digital Matter)*  
> Payload size: 24 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| Magnet Count | magnet_count | sensor | integer | | |
| Magnet Present | magnet_present | sensor | boolean | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- ``