# Watteco Pulse SENS'O AtEx Zone 1
[Device Page](https://www.watteco.com/product/pulse-senso-atex-zone-1/)  
[Technical Documentation](http://support.nke-watteco.com/pulsesensoatexzone1/)  

# Assets
| Name           | Title           | Type    | Kind   | Unit |
|----------------|-----------------|---------|--------|------|
| Index1         | Input 1 Count   | Number  | Sensor |      |
| Index2         | Input 2 Count   | Number  | Sensor |      |
| Index3         | Input 3 Count   | Number  | Sensor |      |
| State1         | Input 1 State   | Integer | Sensor |      |
| State2         | Input 2 State   | Integer | Sensor |      |
| State3         | Input 3 State   | Integer | Sensor |      |
| BatteryVoltage | Battery Voltage | Number  | Sensor | V    |
| RawDownlink    | Raw Downlink (Configuration) | String | Actuator | |
| zclheader      | ZCL Header | Object | Sensor | |

# Downlinks
This device sends batch payloads by default, which isn't fully supported on ALSO IoT platform at the moment (12.4.2023).  
To instruct the device to use standard payloads and report the counter of input 1 (check pinout on Technical Documentation above), send the following payload using "RawDownlink" asset:  
`1106000f0004022300001c2000000005`  
You can confirm the device is sending the standard payload if you receive a key/value pair `"report": "standard"` in ZLC Header object asset.  
The device will now report the counter of input 1 (Index1 asset).  
This counter value is retained even when the device is restarted.  

Here's the relevant part of the documentation:  
> **Configure a standard report on the counter associated to connector input 1+/1-**  
Report the counter value every 5 pulses on connector Input 1+/1-. The counter value has to be reported at least every 2 hours:  
→ A counter on Input 1+/1 is the End Point 0, Cluster “Binary Input” is 0x000F, and Attribute “Count” is 0x0402. The maximum field has to be 0x1c20 to have a report every 2 hours and the minimum field has to be  0x0000 to have a report immediately after the right incrementation. The delta has to be configured to 0x05 for a report every 5 pulses.  
Applicative payload is: `11 06 00 0f 00 04 02 23 00 00 1c 20 00 00 00 05`  
`11`: Fctrl (Endpoint=0)  
`00 00`: minimum reporting interval (0 seconds)  
`1c 20`: maximum reporting interval (2 hours)  
`00 00 00 05`: reportable change (5 pulses)  
→ Response: `11 07 00 0f 00 00 04 02`  
To disable the previous configuration, change the value of the minimum and maximum sending intervals and the delta to 0: `11 06 00 0f 00 04 02 23 00 00 00 00 00 00 00 00`    

# Example Payloads  
`3203001952E10000002E117B00000081903D000080411040801D11604704D8119024912492247B`  
`32040017C92100000000117B00000080903D000000401040801D11604704D8119024912492247B`  
`320400198B210000002E117B00000081903D000080411040801D11604704D8119024912492247B`
`110A000F04022300000036`  
`1107000F00000402`  