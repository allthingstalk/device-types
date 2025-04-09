# Digital Matter G150 Global

> Device Type: `DigitalMatter/g150-global`  

## Asset List (new integration, no ABCL)
| Title | Name | Type | Profile | Unit | Extra |
|---|---|---|---|---|---|
| Reason | reason | sensor | number | | |
| Altitude | altitude | sensor | number | m | |  
| Internal Battery Voltage | analogue_data_1 | sensor | number | V | |
| External Voltage | analogue_data_2 | sensor | number | V | |
| Ignition | din_0 | sensor | boolean | | |
| Odometer | odometer | sensor | number | km | |
| Runhours | run_hours | sensor | number | hrs | |
| Internal Temperature | analogue_data_3 | sensor | number | °C | |
| GSM Signal Strength | analogue_data_4 | sensor | number | dBm | |
| Location Accuracy | location-accuracy | sensor | number | m |  |
| Speed | speed | sensor | number | km/h |  |
| Altitude | altitude | sensor | number | m |  |
| Location | location | sensor | object |  | {"type":"object","properties":{"latitude":{"type":"number"},"longitude":{"type":"number"},"altitude":{"type":"number"},"accuracy":{"type":"number"}}} |
| G-Force Peak | gforce_peak | sensor | number | | |
| G-Force Average | gforce_average | sensor | number | | |
| G-Force Duration | gforce_duration | sensor | number | | |