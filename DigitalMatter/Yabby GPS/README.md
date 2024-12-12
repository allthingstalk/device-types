# Digital Matter Yabby GPS

> Device Type: `DigitalMatter/yabby-gps`  

## Asset List (new integration - no ABCL)
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Reason | reason | sensor | number | | |
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Altitude | altitude | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |
| G-Force Peak | gforce_peak | sensor | number | | |
| G-Force Average | gforce_average | sensor | number | | |
| G-Force Duration | gforce_duration | sensor | number | | |

Changes:  
- Asset `recovery` removed
- Asset `reset` removed
- Asset `battery-voltage` renamed to `analogue_data_1`
- Asset `reason` added
- Asset `gforce_peak` added
- Asset `gforce_average` added
- Asset `gforce_duration` added