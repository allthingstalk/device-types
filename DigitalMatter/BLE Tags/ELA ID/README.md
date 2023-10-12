# ELA ID Bluetooth Tag

> Tag Type: 14 *(via Digital Matter)*  
> Payload size: 27 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| Manufacturer ID | manufacturer_id | sensor | string | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- `gldQKCzzUyBJRCAwMDM5NzYAAAAAAAAAAAAA`
- `