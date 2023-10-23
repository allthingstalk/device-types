# ELA RHT Bluetooth Tag

> Tag Type: 16 *(via Digital Matter)*  
> Payload size: 24 Bytes

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Tag Name | tag_name | sensor | string | | |
| Relative Humidity | humidity | sensor | integer | % | |
| Temperature | temperature | sensor | number | °C | |
| Provisioner Device ID | provisioner_device_id | virtual | string | | |
| Location | location | virtual | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

## Example Payloads
- `OxWSvcPTUCBSSFQgOTAzOUFDYwAAQAUH`
- `OxWSvcPTUCBSSFQgOTAzOUFDAAAAQAQH`
- `OxWSvcPTUCBSSFQgOTAzOUFDAQAAP/8G`
- `OxWSvcPTUCBSSFQgOTAzOUFDNQAAP/oG`
- `OxWSvcPTUCBSSFQgOTAzOUFDxwAAPkoI`
- `OxWSvcPTUCBSSFQgOTAzOUFDjAAAN5kI`
- `ppbNpArMUCBSSFQgOTAzOUFEYwAANo8I`
- `ppbNpArMUCBSSFQgOTAzOUFEAQAAPcQH`