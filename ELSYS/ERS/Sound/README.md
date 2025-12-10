# ELSYS ERS Sound

> Device Type: `elsys/ers-sound`  

[Operating Manual](https://elsys.se/public/manuals/Operating%20Manual%20ERS%20Sound.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_Sound_datasheet.pdf)  

Do not install it near loud sound sources such as doors, machines (e.g., printer, coffee machine) or in other areas where there are loud sounds. Such placements will give false sound values, both peak, and average.

## Assets
| Name         | Title               | Unit  | Data Type | Asset Type |
| ------------ | ------------------- | ----- | --------- | ---------- |
| soundAverage | Sound Level Average | dBspl | integer   | sensor     |
| soundPeak    | Sound Level Peak    | dBspl | integer   | sensor     |
| motion       | Motion Count        | -     | integer   | sensor     |
| light        | Light Level         | Lux   | integer   | sensor     |
| humidity     | Humidity            | %     | integer   | sensor     |
| temperature  | Temperature         | °C    | number    | sensor     |
| battery      | Battery Voltage     | V     | number    | sensor     |
| raw_downlink | Raw Downlink (Configuration) | | string | actuator |

## Rules

| Rule                            | Notification Body                                                                                                                       | State   | Notifies via | People Notified |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ | --------------- |
| If Battery Voltage <= 3.0 Volts | {{{{deviceId}}/%title}} battery voltage is low at {{{{deviceId}}/battery}}V! Replace the battery as soon as possible to avoid downtime. | Enabled | Web + E-Mail | Owner           |
| Watchdog, 30 minutes            | -                                                                                                                                       | Enabled | Web + E-Mail | Owner           |

## Example Payloads
`01007C02300400020500070E27154022`  
`0100FF02230400000500070E3B154022`  