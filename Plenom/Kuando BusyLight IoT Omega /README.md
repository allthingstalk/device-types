# Plenom Kuando BusyLight IoT Omega

> Device Type: `plenom/kuando-busylight-iot-omega`  

[Manufacturer's Device Website](https://www.plenom.com/products/kuando-busylight-iot-lorawan/)

## Assets

| Name | Title | Type   | Kind   | Unit | Advanced |
|-------|-------|--------|--------|------|------|
| [color](#asset-color) | Color | Object | Actuator | | {"type":"object","properties":{"r":{"type":"integer","minimum":0,"maximum":255},"g":{"type":"integer","minimum":0,"maximum":255},"b":{"type":"integer","minimum":0,"maximum":255},"on_time":{"type":"integer","minimum":0,"maximum":255},"off_time":{"type":"integer","minimum":0,"maximum":255}}} |
| [uplinks_without_downlink](#asset-uplinks-without-downlink) | Uplinks Without Downlink | integer | actuator | uplinks | |
| [uplink_interval](#asset-uplink-interval) | Uplink Interval | integer | actuator | minutes | |
| request_keepalive | Request Keepalive | boolean | actuator | | |
| auto_uplink | Auto Uplink | boolean | actuator | | |
| adr | Adaptive Data Rate | boolean | actuator | | |
| rssi | Received Signal Strength Indicator | integer | sensor | dBm | |
| snr | Signal to Noise Ratio | integer | sensor | dB | |
| messages_received | Downlinks Received | integer | sensor | downlinks | |
| messages_sent | Uplinks Sent | integer | sensor | uplinks | |
| sw_rev | Software Revision | integer | sensor | | |
| hw_rev | Hardware Revision | integer | sensor | | |
| factory_reset | Factory Reset | boolean | actuator | | |

> Defaults: 
> - **Auto Uplink**: False *(Disabled)*
> - **Adaptive Data Rate**: True *(Enabled)*
> - **Uplink Interval**: 30 *(minutes)*
> - **Uplinks Without Downlink**: 240 (5 days with 30 min uplink interval)

### Asset: **Color**
This asset is an actuator object and the device's light color is controlled via the key-element pairs inside of this object.  
The device reports its current light color state via this asset as well.  
  
Explanation of Key-Value Pairs:
- `r`: Brightness of Red Color, from 0 (off) to 255 (brightest)
- `g`: Brightness of Green Color, from 0 (off) to 255 (brightest)
- `b`: Brightness of Blue Color, from 0 (off) to 255 (brightest)
- `on_time`: The amount of time the chosen lights should be steadily on, in units of 100ms. Maximum is 255, which translates to 25.5 seconds, **but this number is irrelevant when `off_time` is set to `0` as the light will be steadily on.**
- `off_time`: The amount of time the chosen lights should be off, in units of 100ms. Maximum is 255, which translates to 25.5 seconds. When this value is set to `0`, the light is always in steady **on** mode, meaning it doesn't blink. 

So, for example, if you wish to have solid white color, set all 3 colors to maximum and `on_time` to 255  send the following command:  
`{"value":{"r":255,"g":255,"b":255,"on_time":255,"off_time":0}}`

### Asset: **Uplinks Without Downlink**
The device has a built-in watchdog function (counter) that will restart the device if a given number of uplinks are sent without having received a downlink towards the device.  
This counter can be changed using this asset. 
> To translate this value to actual time, you need to take into account the set uplink interval (which is 30 minutes by default), so if the `Uplinks Without Downlink` value is set to `40`, the actual time is `40 * 30 minutes = 20 hours`

### Asset: **Uplink Interval**
This actuator asset control the amount of minutes that pass between keepalive uplinks sent by the device. Basically how often the device reports to the platform. The default is 30 minutes.  

### Asset: **Uplinks Sent**
This asset shows the number of uplinks sent by the device towards the platform since the last join to the LoRaWAN network.

### Asset: **Downlinks Received**
This asset shows the number of downlinks sent by the device towards the platform since the last join to the LoRaWAN network.

## Example Paylods

### Uplink
`00000000000000000000000025000000000032ff00380c01`  
`0000000000000000000000000c000000000032ff00380c01`  
`afffffff220000000300000003000000ffffffff00380c01`  
`9effffff200000000500000007000000ffffffff00380c01`  
`a9ffffff26000000050000000a0000000000ff0000380c01`  

### Downlink
`0000FF0000`  
`282828FF00`  
`0601`  