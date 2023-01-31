# Ellenex RS1-L

[Manufacturer's Website](https://www.ellenex.com/products/rs1-l)
[Manufacturer's Datasheet](https://www.ellenex.com/_files/ugd/dc15ca_0859bec0e0b74445bbf33f66471379f7.pdf)

## Assets

| Name               | Title               | Type    | Kind     | Unit    |
|--------------------|---------------------|---------|----------|---------|
| SensorReading      | Sensor Reading      | Number  | Sensor   |         |
| TemperatureReading | Temperature Reading | Number  | Sensor   | °C      |
| Battery            | Battery Voltage     | Number  | Sensor   | V       |
| SamplingTime       | Sampling Time       | Integer | Actuator | minutes |

## Example Payloads

`04500000009C2C22`  
`04500000009C3022`  
`0450000000800022`  
`010000010A` - This is a downlink configuration payload that sets the device sampling interval to 10 minutes.  