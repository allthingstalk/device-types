# Eddystone Bluetooth Tag

> Tag Type: 2 *(via Digital Matter)*  
> Device Type: `eddystone/beacon`  
> Payload size: 17 Bytes (default, no MAC Address) or 23 bytes (with MAC Address, not recommended)  

The Hardware Unique ID for Eddystone is made out of its Namespace ID and Instance ID combined.  
For example, if the Namespace ID of the tag is `7136CB2CA54238AFDAB4` and the Instance ID is `7B334E4D8214`, the Hardware Unique ID you would enter on the platform would be `7136CB2CA54238AFDAB47B334E4D8214`.  
**The Hardware Unique ID needs to be capitalized.**

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Namespace ID | namespace_id | sensor | string | |
| Instance ID | instance_id | sensor | string | | |
| Transmit Power | tx_power | sensor | integer | dBm | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- `/aUGk6TiT7Gvz/2lBpOk4gM=`
- `KTTAbKOCVarU3moXTi0AVeI=`