# Digital Matter Oyster2

## Asset List (new integration - no ABCL)
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Battery Percentage | analogue_data_6 | sensor | number | % | |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Altitude | altitude | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

Changes:  
- Asset `recovery` removed
- Asset `reset` removed
- Asset `battery-voltage` renamed to `analogue_data_1`  
- Asset `battery-percentage` renamed to `analogue_data_6`