# Digital Matter Bolt

## Asset List (new integration - no ABCL)
  
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Altitude | altitude | sensor | number | m | |  
| Reason | reason | sensor | number | | |
| External Voltage | analogue_data_2 | sensor | number | V | |
| Ignition | din_0 | sensor | boolean | | |
| Odometer | odometer | sensor | number | km | |
| Runhours | run_hours | sensor | number | hrs | |
| Temperature | analogue_data_3 | sensor | number | °C | |
| Trip Distance | trip_distance | sensor | number | km | |
| Trip Duration | trip_duration | sensor | number | min | |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |

Changes: 
- Asset `external-voltage` renamed to `analogue_data_2`
- Asset `ignition` renmed to `din_0`
- Asset `runhours` renamed to `run_hours`
- Asset `temperature` renamed to `analogue_data_3`
- Asset `trip-distance` renamed to `trip_distance`
- Asset `trip-duration` renamed to `trip_duration`
- Asset `reason` added