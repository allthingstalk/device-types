# MClimate Vicki Device Type

## Assets

| Name | Title | Type   | Kind   | Unit | Advanced |
|-------|-------|--------|--------|------|------|
| uplinkType | Uplink Type | Integer | Actuator |  |  |
| temperatureRange | Temperature Range | Object | Actuator |  | { min: Integer, max: Integer } |
| targetTemperature | Target Temperature | Number | Actuator |  |  |
| operationalMode | Operational Mode | Integer | Actuator | |  |
| keepAliveTime | KeepAlive Time | Integer | Actuator | |  |
| joinRetryPeriod | Join Retry Period | Integer | Actuator | minutes |  |
| internalAlgoTdiffParams | Internal Algorithm Tdiff Parameters | Object | Actuator | | { cold: Integer, warm: Integer } |
| childLock | Child Lock | Boolean | Actuator | | |
| reason | Uplink Reason | Number | Sensor | |  |
| sensorTemperature | Sensor Temperature | Number | Sensor | C |  |
| relativeHumidity | Relative Humidity | Number | Sensor | % |  |
| motorRange | Motor Range | Number | Sensor | steps |  |
| motorPosition | Motor Position | Integer | Sensor | steps | |  
| batteryVoltage | Battery Voltage | Number | Sensor | V |  |
| openWindow | Window Open | Boolean | Sensor | |  |
| highMotorConsumption | High Motor Consumption | Boolean | Sensor | |  |
| lowMotorConsumption | Low Motor Consumption | Boolean | Sensor | |  |
| brokenSensor | Broken Sensor | Boolean | Sensor | |  |
| deviceVersions | Device Versions | Object | Sensor | | { hardware: Number, software: Number } |
| openWindowParams | Window Open Parameters | Object | Actuator | | { enabled: Boolean, duration: Integer, motorPosition: Integer, delta: Number } | 
| internalAlgoParams | Internal Algorithm Parameters | Object | Sensor | | { period: Integer, pFirstLast: Integer, pNext: Integer } |
| watchDogParams | Watchdog Parameters | Object | Sensor | | { wdpC: TODO, wdpUc: TODO } |
| primaryOperationalMode | Primary Operational Mode | Number | Sensor | | |
| batteryRangeBoundaries | Battery Range Boundaries | Object | Sensor | | { Boundary1: Integer, Boundary2: Integer, Boundary3: Integer } |
| batteryRangesOverVoltage | Battery Over-Voltage Ranges | Object | Sensor | | { Range1: Integer, Range2: Integer, Range3: Integer } |
| OVAC | OVAC | Integer | Sensor | | |
| manualTargetTemperatureUpdate | Manual Target Temperature Update | Integer | Sensor | | |
| proportionalAlgoParams | Proportional Algorithm Parameters | Object | Sensor | | { coefficient: Integer, period: Integer } |
| algoType | Algorithm Type | Integer | Sensor | | |
| forceCloseValve | Force Close Valve | Boolean | Actuator | | |
| recalibrateMotor | Recalibrate Motor | Boolean | Actuator | | |
| getAllParams | Get All Parameters | Boolean | Actuator | | |
  

[Commands cheat sheet](https://docs.mclimate.eu/mclimate-lorawan-devices/devices/mclimate-vicki-lorawan/vicki-lorawan-device-communication-protocol/command-cheat-sheet)  
[Manufacturer's Downlink Encoder (ES6)](https://docs.mclimate.eu/mclimate-lorawan-devices/devices/mclimate-vicki-lorawan/downlink-encoder)  
[Manufacturer's Uplink Decoder](https://docs.mclimate.eu/mclimate-lorawan-devices/devices/mclimate-vicki-lorawan/vicki-uplink-decoder)  


## All available uplink and downlink features  

### All Uplink Key/Value Pairs:  

- `reason` - Number
- `targetTemperature` - Number
- `sensorTemperature` - Number
- `relativeHumidity` - Number
- `motorRange` - Number
- `motorPosition` - Number
- `batteryVoltage` - Number
- `openWindow` - Boolean
- `childLock` - Boolean
- `highMotorConsumption` - Boolean
- `lowMotorConsumption` - Boolean
- `brokenSensor` - Boolean
- `deviceVersions` - Object3
  { hardware: Number, software: Number }
- `keepAliveTime` - Integer
- `openWindowParams` - Object
  { enabled: Boolean, duration: Integer, motorPosition: Integer, delta: Number }
- `temperatureRange` - Object
  { min: Integer, max: Integer }
- `internalAlgoParams` - Object
  { period: Integer, pFirstLast: Integer, pNext: Integer}
- `internalAlgoTdiffParams` - Object
  { warm: Integer, cold: Integer }
- `operationalMode` - Integer
- `joinRetryPeriod` - Number (minutes)
- `uplinkType` - Integer
- `watchDogParams` - Object
  { wdpC: TODO, wdpUc: TODO }
- `primaryOperationalMode` - Number (TODO?)
- `batteryRangeBoundaries` - Object
  { Boundary1: Integer, Boundary2: Integer, Boundary3: Integer }
- `batteryRangesOverVoltage` - Object
  { Range1: Integer, Range2: Integer, Range3: Integer }
- `OVAC` - Integer
- `manualTargetTemperatureUpdate` - Integer
- `proportionalAlgoParams` - Object
  { coefficient: Integer, period: Integer }
- `algoType` - Integer

### Used Actuators (Downlink Functions):  

- `uplinkType`, Integer  
  Function: `setUplinkType(type)`  
  Sensor: `uplinkType`  
- `temperatureRange`, Object: { min: Integer, max: Integer }  
  Function: `setTemperatureRange(min, max)`  
  Sensor: `temperatureRangeSettings`
- `targetTemperature`, Number  
  Function: `setTargetTemperature(Number)`  
  Sensor: `targetTemperature`
- `operationalMode`, Integer  
  Function: `setOperationalMode(Integer)`  
  Sensor: `operationalMode`
- `keepAliveTime`, Integer  
  Function: `setKeepAlive(Integer)`  
  Sensor: `keepAliveTime`
- `joinRetryPeriod`, Integer (minutes)  
  Function: `setJoinRetryPeriod(Integer)`  
  Sensor: `joinRetryPeriod`
- `internalAlgoTdiffParams`, Object: { warm: Integer, cold: Integer }  
  Function: `setInternalAlgoTdiffParams(warm, cold)`  
  Sensor: `internalAlgoTdiffParams`  
- `childLock`, Boolean  
  Function: `setChildLock(enabled)`  
  Sensor: `childLock`  
- `openWindowParams`, Object  
  Function: `setOpenWindow(enabled, duration, motorPosition, delta)`  
  Sensor: `openWindowParams`  
- `forceCloseValve`, Boolean  
  Function: `forceClose()`  
- `recalibrateMotor`, Boolean  
  Function: `recalibrateMotor()`  
- `getAllParams`, Boolean  
  Function: `getAllParams()`


### All Downlink Functions Available

- `setUplinkType(type)`
- `setTemperatureRange(min, max)`
- `setTargetTemperature(Number)`
- `setTargetTemperatureAndMotorPosition(motorPosition, targetTemperature)`
- `setOperationalMode(mode)`
- `setKeepAlive(time)`
- `setJoinRetryPeriod(period)`
- `setOpenWindow(enabled, duration, motorPosition, delta)`
- `setInternalAlgoTdiffParams(warm, cold)`
- `setChildLock(enabled)`
- `sendCustomHexCommand(command)`
- `receiveKeepaliveCommand()`
- `recalibrateMotor()`
- `getAllParams()`
- `forceClose()`


## Example Paylods
`81138A8BC4C411E000`  
`810F7C87C4C411E000`  
`28148114837D15C411E000`  
`81117B96518411E000`  