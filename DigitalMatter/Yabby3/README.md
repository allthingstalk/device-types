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
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Altitude | altitude | sensor | number | m |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

Changes:  
- Asset `recovery` removed
- Asset `reset` removed
- Asset `battery-voltage` renamed to `analogue_data_1`