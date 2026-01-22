# ELSYS ERS Display LoRa

> Device Type: `elsys/ers-display-lora`  

[Operating Manual](https://elsys.se/public/manuals/New/ERS_Display_Lora_2.2.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_Display_Series_Datasheet_V.2.0.pdf)


A wireless LoRaWAN® sensor for indoor environment monitoring that measures temperature and humidity, light, and detects motion. The sensor is equipped with a display, which enables effortless access to real-time information at a glance. The 2.13″ e-paper display has configurable features via downlink, NFC, or custom order.  
Use the general JS decoder.


## Assets
| Name        | Title           | Unit | Data Type | Asset Type | Range |
| ----------- | --------------- | ---- | --------- | ---------- | ----- |
| motion      | Motion Count    | -    | number   | sensor     |  |
| light       | Light Level     | Lux  | number   | sensor     | 1 - 10000 |
| humidity    | Humidity        | %    | number   | sensor     | 0 - 100 |
| temperature | Temperature     | °C   | number    | sensor     | -10 - 80 |
| battery     | Battery Voltage | V    | number    | sensor     | 1 - 10 |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator | |

## Example Payloads  
None yet