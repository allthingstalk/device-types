# DigitalMatter Hawk 4G

> Device Type: `DigitalMatter/hawk`  

[Manufacturer's Website](https://www.digitalmatter.com/devices/hawk/)

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Reason | reason | sensor | number | | |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| External Voltage | analogue_data_2 | sensor | number | V |  |
| Internal Temperature | analogue_data_3 | sensor | number | °C |  |
| GSM Signal Strength | analogue_data_4 | sensor | number | dBm |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Altitude | altitude | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| G-Force Peak | gforce_peak | sensor | number | | |
| G-Force Average | gforce_average | sensor | number | | |
| G-Force Duration | gforce_duration | sensor | number | ms | |
| Tamper Alert | din_6 | sensor | boolean | | |