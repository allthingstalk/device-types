# Eddystone Bluetooth Tag

> Tag Type: 2 *(via Digital Matter)*  
> Payload size: 17 Bytes (no MAC Address) or 23 bytes (with MAC Address)

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Namespace ID | hardware_unique_id | sensor | string | |
| Instance ID | instance_id | sensor | string | | |
| Transmit Power | tx_power | sensor | integer | dBm | |
| MAC Address (optional) | mac_address | sensor | string | | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- `/aUGk6TiT7Gvz/2lBpOk4gM=`