# Digital Matter Yabby3

## Asset List

### Old Digital Matter Integration (ABCL)

| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Remote Reset | reset | actuator | boolean |  |  |
| Recovery Mode | recovery | actuator | boolean |  |  |
| Battery Voltage | battery-voltage | sensor | number | V |  |
| Altitude | altitude | sensor | number | m |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

### New Digital Matter Integration (no ABCL)

| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Reason | reason | sensor | number | | |
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Altitude | altitude | sensor | number | m |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
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