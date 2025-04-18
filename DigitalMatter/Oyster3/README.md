# Digital Matter Oyster3

> Device Type: `DigitalMatter/oyster3`  

## Asset List (new integration - no ABCL)
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Reason | reason | sensor | number | | |
| Battery Voltage | analogue_data_1 | sensor | number | V | |
| Internal Temperature | analogue_data_3 | sensor | number | °C |  
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Altitude | altitude | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |
| G-Force Peak | gforce_peak | sensor | number | | |
| G-Force Average | gforce_average | sensor | number | | |
| G-Force Duration | gforce_duration | sensor | number | | |
| Battery Level Good | din_1 | sensor | boolean | | |
| Battery Level Critical | din_2 | sensor | boolean | | |

Changes:  
- Asset `recovery` removed
- Asset `reset` removed  
- Asset `battery-voltage` renamed to `analogue_data_1`
- Asset `internal-temperature` renamed to `analogue_data_3`
- Asset `reason` added
- Asset `gforce_peak` added
- Asset `gforce_average` added
- Asset `gforce_duration` added
- Asset `din_1` added
- Asset `din_2` added