# Watteco Movee 

## Assets

| Name | Title | Type | Kind | Unit |
|------|-------|------|------|------|
| batteryLevel | Battery Percentage | Number | Sensor | % |
| temperature | Temperature | Number | Sensor | °C |
| dataType | Data Type | Number | Sensor | |
| buttonPushed | Button Pushed | Boolean | Sensor | |
| gx | Gx | Number | Sensor | |
| gy | Gy | Number | Sensor | |
| gz | Gz | Number | Sensor | |
| pitch | Pitch | Number | Sensor | |
| roll | Roll | Number | Sensor | |
| RawDownlink | Raw Downlink (Configuration) | String | Sensor | |

## Example Paylods
`E018FE76342E303B76322E302E313B76342E342E30633B7273743A504F52AA`  
`E31AFE76342E303B76322E302E313B76342E342E30633B7273743A535953525354AA`  
`EF1301AA`  
`D51201AA`

ALIVE payload
Payload example: `e61801aa`


SHOCK algorithm payload
Payload example: `c11a040290fe700db0aa`


TEMPERATURE algorithm payload
Payload example: `be1a021a1919191919191919aa`


VERSION payload
The VERSION frame is the first frame sent after a Join Accept in OTAA or is sent after a VERSION Downlink
request.
Payload example: `8a19fe76332e373b76312e382e373b76342e332e31623b7273743a504f52aa`
