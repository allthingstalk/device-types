# Watteco Smart Plug
[Device Page](https://www.watteco.com/product/smart-plug-sensor-lorawan/)  
[Technical Documentation](https://support.watteco.com/smartplug/)  

# Assets
| Name               | Title                            | Type    | Kind     | Unit    |
|--------------------|----------------------------------|---------|----------|---------|
| ActiveEnergyWh     | Active Energy                    | Number  | Sensor   | Wh      |
| ReActiveEnergyVARh | Reactive Energy                  | Number  | Sensor   | VARh    |
| NumberOfSample     | Accumulation duration            | Number  | Sensor   | minutes |
| ActivePowerW       | Active Power                     | Number  | Sensor   | W       |
| ReActivePowerVAR   | Reactive Power                   | Number  | Sensor   | VAR     |
| Output             | Output                           | Boolean | Actuator |         |
| Freq               | Frequency                        | Number  | Sensor   | Hz      |
| FreqMin            | Minimum Frequency                | Number  | Sensor   | Hz      |
| FreqMax            | Maximum Frequency                | Number  | Sensor   | Hz      |
| Vrms               | Current Root Mean Square Voltage | Number  | Sensor   | V       |
| VrmsMin            | Minimum Root Mean Square Voltage | Number  | Sensor   | V       |
| VrmsMax            | Maximum Root Mean Square Voltage | Number  | Sensor   | V       |
| Vpeak              | Vpeak                            | Number  | Sensor   | V       |
| VpeakMin           | Vpeak Min                        | Number  | Sensor   | V       |
| VpeakMax           | Vpeak Max                        | Number  | Sensor   | V       |
| OverVoltageNumber  | Number of overvoltage events     | Integer | Sensor   |         |
| SagNumber          | Number of voltage sag events     | Integer | Sensor   |         |
| BrownoutNumber     | Number of brownout events        | Integer | Sensor   |         |
| RawDownlink        | Raw Downlink (Configuration)     | String  | Actuator |         |
| zclheader          | ZCL Header                       | Object  | Sensor   |         |

# Example Payloads  
`100160A8041800003010A41AAAA11AAA3101`  
`100340E80C1D00A02D10A41AAAA11AAA3100`  
`100220689E1C00A02D10A41AAAA11AAA3100`  
`100260A8880C00003010A41AAAA11AAA3101`  
`110a000600001001` - Reports the state of the plug output as ON  
`110a00520000410c00004d0000050003000afff0` - Reports metering of power  