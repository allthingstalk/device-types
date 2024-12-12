# ELSYS ERS Lite

> Device Type: `elsys/ers-lite`  

[Operating Manual](https://elsys.se/public/manuals/Operating%20Manual%20ERS%20Lite.pdf)  
[Datasheet](https://elsys.se/public/datasheets/ERS_Lite_datasheet.pdf)

This sensor measures temperature and humidity.
Use the general ELSYS JavaScript payload decoder.


## Assets
| Name        | Title           | Unit | Data Type | Asset Type |
| ----------- | --------------- | ---- | --------- | ---------- |
| humidity    | Humidity        | %    | integer   | sensor     |
| temperature | Temperature     | °C   | number    | sensor     |
| battery     | Battery Voltage | V    | number    | sensor     |

## Rules
| Rule                            | Notification Body                                                                                                                       | State   | Notifies via | People Notified |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ | --------------- |
| If Battery Voltage <= 3.0 Volts | {{{{deviceId}}/%title}} battery voltage is low at {{{{deviceId}}/battery}}V! Replace the battery as soon as possible to avoid downtime. | Disabled | Web + E-Mail | Owner           |
| Watchdog, 30 minutes            | -                                                                                                                                       | Enabled | Web + E-Mail | Owner           |