# Digital Matter Yabby Edge

## Asset List
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Remote Reset | reset | actuator | boolean |  |  |
| Recovery Mode | devstat_7 | actuator | boolean |  |  |
| Battery Voltage | analogue_data_1 | sensor | number | V |  |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |