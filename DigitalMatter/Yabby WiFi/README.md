# Digital Matter Yabby WiFi

## Asset List (new DM Integration, no ABCL)

| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Remote Reset | reset | actuator | boolean |  |  |
| Recovery Mode | devstat_7 | actuator | boolean |  |  |
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

Changes:  
- Asset `recovery` renamed to `devstat_7`
- Asset `battery-voltage` renamed to `analogue_data_1`