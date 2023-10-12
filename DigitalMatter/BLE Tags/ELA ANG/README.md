# ELA ANG Bluetooth Tag

> Tag Type: 13 *(via Digital Matter)*  
> Payload size: 27 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| X Axis Acceleration | x_axis_acceleration | sensor | integer | mg | |
| Y Axis Acceleration | y_axis_acceleration | sensor | integer | mg | |
| Z Axis Acceleration | z_axis_acceleration | sensor | integer | mg | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- ``