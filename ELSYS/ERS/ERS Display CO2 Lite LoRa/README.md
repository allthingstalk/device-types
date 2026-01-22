# ELSYS ERS Display CO2 Lite LoRa

> Device Type: `elsys/ers-display-co2-lite-lora`  

[Operating Manual](https://elsys.se/public/manuals/New/ERS_Display_Lora_2.2.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_Display_Series_Datasheet_V.2.0.pdf)


A wireless LoRaWAN® sensor for indoor environments that measures CO2 levels, temperature, and humidity. The sensor is equipped with a display, which enables effortless access to real-time information at a glance. 
Use the general JS decoder.


## Assets
| Name        | Title           | Unit | Data Type | Asset Type | Range |
| ----------- | --------------- | ---- | --------- | ---------- | ----- |
| humidity    | Humidity        | %    | number   | sensor     | 0 - 100 |
| temperature | Temperature     | °C   | number    | sensor     | -10 - 80 |
| battery     | Battery Voltage | V    | number    | sensor     | 1 - 10 |
| co2         | CO2             | ppm  | number    | sensor     | 100 - 10000 |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator | |

## Example Payloads  
None yet