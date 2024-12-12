# ELSYS ERS

> Device Type: `elsys/ers`  

[Operating Manual](https://www.elsys.se/public/manuals/Operating%20Manual%20ERS.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_datasheet.pdf)


ERS can measure temperature, humidity, light, and room activity.
Use the general JS decoder.


## Assets
| Name        | Title           | Unit | Data Type | Asset Type |
| ----------- | --------------- | ---- | --------- | ---------- |
| motion      | Motion Count    | -    | integer   | sensor     |
| light       | Light Level     | Lux  | integer   | sensor     |
| humidity    | Humidity        | %    | integer   | sensor     |
| temperature | Temperature     | °C   | number    | sensor     |
| battery     | Battery Voltage | V    | number    | sensor     |

## Rules
| Rule                            | Notification Body                                                                                                                       | State   | Notifies via | People Notified |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ | --------------- |
| If Battery Voltage <= 3.0 Volts | {{{{deviceId}}/%title}} battery voltage is low at {{{{deviceId}}/battery}}V! Replace the battery as soon as possible to avoid downtime. | Enabled | Web + E-Mail | Owner           |
| Watchdog, 30 minutes            | -                                                                                                                                       | Enabled | Web + E-Mail | Owner           |

## Example Payloads  
WIP