# ELSYS ERS Display CO2 LoRa

> Device Type: `elsys/ers-display-co2-lora`  

[Operating Manual](https://elsys.se/public/manuals/New/ERS_Display_Lora_2.2.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_Display_Series_Datasheet_V.2.0.pdf)


A wireless LoRaWAN® sensor for indoor environment monitoring that measures temperature, humidity, CO2 levels, light, and detects motion. The sensor is equipped with a display, which enables effortless access to real-time information at a glance. The 2.13″ e-paper display has configurable features via downlink, NFC, or custom order.
Use the general JS decoder.


## Assets
| Name        | Title           | Unit | Data Type | Asset Type | Range |
| ----------- | --------------- | ---- | --------- | ---------- | ----- |
| light       | Light Level     | Lux  | number   | sensor     | 1 - 10000 |
| motion      | Motion Count    | -    | number   | sensor     |  |
| humidity    | Humidity        | %    | number   | sensor     | 0 - 100 |
| temperature | Temperature     | °C   | number    | sensor     | -10 - 80 |
| battery     | Battery Voltage | V    | number    | sensor     | 1 - 10 |
| co2         | CO2             | ppm  | number    | sensor     | 100 - 10000 |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator | |

## Example Payloads  
None yet