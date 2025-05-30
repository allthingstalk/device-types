# ELA MOV Bluetooth Tag

> Tag Type: 12 *(via Digital Matter)*  
> Device Type: `ELA/mov`  
> Payload size: 24 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| Move Count | move_count | sensor | integer | | |
| Moving | moving | sensor | boolean | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- `WnBGEkrZUCBNT1YgQjAxRUJGAAAAAAAA`
- `m9QCw+X9UCBNT1YgQjAxRUJGAAAAAQAA`
- `WnBGEkrZUCBNT1YgQjAxRUJGAAAAAgAA`
- `m9QCw+X9UCBNT1YgQjAxRUJGAAAABQAA`