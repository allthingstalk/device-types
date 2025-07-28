# Capgemini/HEAD Electronics OfficeSense Comfort v2 Sensor

Use the string asset `Read Data` if you wish to request any parameter or sensor state from the device by sending the name of the asset(s) you wish to be populated.  
For example, sending a string `"sample_interval"` command via the `read_data` asset will make the device send the data to populate the `sample_interval` asset on the next uplink.  
You can also send multiple asset names in a single message. For example, sending a string `"sample_interval, hardware_version, firmware_version, comfort_minimum_interval, heartbeat_interval"` will make the device send the data for all of those assets on the next uplink.

# Assets
| Name                               | Display Name                         | Type    | Kind     | Unit    | Additional         |
|------------------------------------|--------------------------------------|---------|----------|---------|--------------------|
| [co2](#co2)                                | CO2                                  | Number  | Sensor   | ppm     |                    |
| [sound](#sound-level)                              | Sound Level                          | Number  | Sensor   | dB      |                    |
| [light](#light-level)                              | Light Level                          | Number  | Sensor   | Lux     |                    |
| [temperature](#temperature)                        | Temperature                          | Number  | Sensor   | °C      |                    |
| [humidity](#relative-humidity)                           | Relative Humidity                    | Number  | Sensor   | %       | Min: 0, Max: 100   |
| [sample_interval](#sample-interval)                    | Sample Interval                      | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| [temperature_delta](#temperature-delta)                  | Temperature Delta                    | Number  | Actuator | °C      | Min: 0, Max: 50    |
| [humidity_delta](#humidity-delta)                     | Humidity Delta                       | Integer | Actuator | %       | Min: 0, Max: 100   |
| [co2_delta](#co2-delta)                          | CO2 Delta                            | Integer | Actuator | ppm     | Min: 0, Max: 5000  |
| [light_delta](#light-delta)                        | Light Delta                          | Integer | Actuator | Lux     | Min: 0             |
| [sound_delta](#sound-delta)                        | Sound Delta                          | Integer | Actuator | dB      | Min: 0             |
| [comfort_minimum_interval](#minimum-lorawan-interval)           | Minimum LoRaWAN Interval             | Integer | Actuator | seconds | Min: 0, Max: 43200 |
| [battery_percentage](#battery-percentage)                 | Battery Percentage                   | Number  | Sensor   | %       | Min: 0, Max: 100   |
| [battery_voltage](#battery-voltage)                    | Battery Voltage                      | Number  | Sensor   | V       | Min: 0             |
| [heartbeat_interval](#heartbeat-interval)                 | Heartbeat Interval                   | Integer | Actuator | minutes | Min: 1, Max: 720   |
| [lora_rejoin_count](#forced-lorawan-rejoin-counter)                  | Forced LoRaWAN Rejoin Counter        | Integer | Actuator | uplinks | Min: 100, Max: 25000|
| [hardware_version](#hardware-version)                   | Hardware Version                     | String  | Sensor   |         |                    |
| [firmware_version](#firmware-version)                   | Firmware Version                     | String  | Sensor   |         |                    |
| [pcb_id](#pcb-id)                             | PCB ID                               | String  | Sensor   |         |                    |
| [pcb_version](#pcb-version)                        | PCB Version                          | String  | Sensor   |         |                    |
| [firmware_build](#firmware-build-timestamp)                     | Firmware Build Timestamp             | String  | Sensor   |         |                    |
| [read_data](#read-data)                          | Read Data                            | String  | Actuator |         |                    |


## CO2
Environmental CO2 measured with the CO2 sensor on board the device (if available) in parts per million (ppm).

## Sound Level
Environmental sound level measured with the sound sensor on board the device (if available) in dB.

## Light Level
Environmental light intensity measured with the light sensor on board the device (if available) in Lux.

## Temperature
Environmental temperature measured with the temperature sensor on board the device (if available) in Celsius.

## Relative Humidity
Environmental relative humidity measured with the humidity sensor on board the device (if available) as a percentage.

## Sample Interval
The device will conduct measurements with its on-board sensors on an interval based on this configuration. This does NOT mean the sensor will report its measurements right away, this is either triggered on individual sensor thresholds ([Humidity Delta](#Humidity-Delta), [Temperature Delta](#temperature-delta)) or the [Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval).  
> Example: A value of `600` means the device will trigger all its on-board sensors to conduct a measurement every 600 seconds.

## Temperature Delta
The presence sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’ (= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the temperature sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `0.2` means sensor will trigger a LoRaWAN transmission whenever the temperature deviates at least 0.2°C since the last LoRaWAN transmission.

## Humidity Delta
The presence sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’ (= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the humidity sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `3` means the sensor will trigger a LoRaWAN transmission whenever the relative humidity deviates at least 3% since the last LoRaWAN transmission.

## CO2 Delta
The comfort sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’(= difference with last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the CO2 sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `100` means the sensor will trigger a LoRaWAN transmission whenever the CO2 value deviates at least 100ppm compared to the last LoRaWAN transmission.

## Light Delta
The comfort sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’(= difference with last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the light sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `500` means the sensor will trigger a LoRaWAN transmission whenever the light measurement deviates at least 500lux compared to the last LoRaWAN transmission.

## Sound Delta
The comfort sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’(= difference with last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the sound sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).
> Example: A value of `5` means the sensor will trigger a LoRaWAN transmission whenever the sound measurement deviates at least 5dB compared to the last LoRaWAN transmission.

## Minimum LoRaWAN Interval
The comfort sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’(= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place. This interval will prepare a LoRaWAN transmission whenever a certain time has passed even when the individual sensor delta’s have not been exceeded. This ensures the device will send a transmission even when the environment parameters are stable.  
> Example: A value of `3600` means the device will trigger a LoRaWAN transmission at least every 3600 seconds (1 hour), even when the sensor deltas are not exceeded.

## Battery Percentage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health. This parameter will provide a percentage value, based on the voltage level.

## Battery Voltage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health.

## Heartbeat Interval
Heartbeats are special confirmed uplink messages that are sent to confirm the network connectivity from the perspective of the device. Normal uplink messages are ‘fire and forget’ messages. Meaning the messages are sent out and hopefully being picked up by a gateway to deliver to the server. The device cannot detect if the message was delivered to the server. With confirmed uplinks (like the heartbeat) the device expects an acknowledgement from the server after sending the uplink. Which tells the device the current connection is still valid. If these heartbeats are not acknowledged, the device will attempt a new join process to refresh the connection with the server.  
> Example: A value of `720` means the heartbeat interval is set to 720 minutes (= 12 hours).

## Forced LoRaWAN Rejoin Counter
> **NOTE: The value can only be in increments of 100, with everything else being rounded. Sending a value of `17235` will be rounded to `17200` and the device will return the same rounded value.**   

Besides the heartbeat, the device will also try to rejoin the network after a certain amount of uplink messages have been sent. This is to periodically refresh the LoRaWAN session credentials to increase security.  
> Example: A value of `2000` means the device will perform a new join request (and get new encryption keys) after 2000 uplink messages.  

## Hardware Version
The Firmware Build Timestamp is generated when the firmware file is compiled. Together with the software
version this parameter provides information what firmware is flashed on the device.

## Firmware Version
The version of the software running on the device (major and minor version).

## PCB ID
PCB (Printed Circuit Board) Identification Number. This number matches the identification number (P-number) that can be found on the physical device. It can be used to check the type of sensor hardware.

## PCB Version
PCB (Printed Circuit Board) version / revision number. The sensor hardware (indicated by the PCB ID or P-number) can have multiple hardware iterations. This iteration is given by the PCB version parameter.

## Firmware Build Timestamp
The Firmware Build Timestamp is generated when the firmware file is compiled. Together with the software
version this parameter provides information what firmware is flashed on the device.

## Read Data
Use this asset if you wish to request any parameter or sensor state from the device by sending the name of the asset(s) you wish to be populated.  
> Example: Sending a string `"sample_interval"` command will make the device send the data to populate the `sample_interval` asset on the next LoRaWAN transmission.  
> **NOTE:** You can also send multiple asset names in a single message. Sending a string `"sample_interval, hardware_version, firmware_version, comfort_minimum_interval, heartbeat_interval"` will make the device send the data for all of those assets on the next LoRaWAN transmission.


# Example Payloads  
`2218212364` 
`0563046363630303000107e7010a092e0a` 
`30098f323c3303d2342dc5350031` 
`3009d932363301be3439ad350038` 
`3009d1323933019c340140350031` 
`3009e0323b33023e34287935003a` 