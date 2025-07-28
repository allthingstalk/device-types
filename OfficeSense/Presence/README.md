# Capgemini/HEAD Electronics OfficeSense Presence Sensor

Use the string asset `Read Data` if you wish to request any parameter or sensor state from the device by sending the name of the asset(s) you wish to be populated.  
For example, sending a string `"sleep_duration"` command via the `read_data` asset will make the device send the data to populate the `sleep_duration` asset on the next uplink.  
You can also send multiple asset names in a single message. For example, sending a string `"sleep_duration, hardware_version, firmware_version, validation_duration, heartbeat_interval"` will make the device send the data for all of those assets on the next uplink.

# Assets
| Name                               | Display Name                         | Type    | Kind     | Unit    | Additional         |
|------------------------------------|--------------------------------------|---------|----------|---------|--------------------|
| occupied                           | Occupied                             | Boolean | Sensor   |         |                    |
| activity_level                     | Activity Level                       | Integer | Sensor   |         |                    |
| temperature                        | Temperature                          | Number  | Sensor   | °C      |                    |
| humidity                           | Relative Humidity                    | Number  | Sensor   | %       | Min: 0, Max: 100   |
| temperature_delta                  | Temperature Delta                    | Number  | Actuator | °C      | Min: 0, Max: 50    |
| humidity_delta                     | Humidity Delta                       | Integer | Actuator | %       | Min: 0, Max: 100   |
| battery_percentage                 | Battery Percentage                   | Number  | Sensor   | %       | Min: 0, Max: 100   |
| battery_voltage                    | Battery Voltage                      | Number  | Sensor   | V       | Min: 0             |
| sample_interval                    | Sample Interval                      | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| activity_threshold                 | Activity Level Threshold (Primary)   | Integer | Actuator |         | Min: 0, Max: 255   |
| threshold_hysteresis               | Activity Level Threshold (Secondary) | Integer | Actuator |         | Min: 0, Max: 255   |
| validation_duration                | Validation Duration                  | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| sleep_duration                     | Sleep Duration                       | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| comfort_minimum_interval           | Minimum LoRaWAN Interval             | Integer | Actuator | seconds | Min: 0, Max: 43200 |
| heartbeat_interval                 | Heartbeat Interval                   | Integer | Actuator | minutes | Min: 1, Max: 720   |
| lora_rejoin_count                  | Forced LoRaWAN Rejoin Counter        | Integer | Actuator | uplinks | Min: 100, Max: 25000|
| hardware_version                   | Hardware Version                     | String  | Sensor   |         |                    |
| firmware_version                   | Firmware Version                     | String  | Sensor   |         |                    |
| pcb_id                             | PCB ID                               | String  | Sensor   |         |                    |
| pcb_version                        | PCB Version                          | String  | Sensor   |         |                    |
| firmware_build                     | Firmware Build Timestamp             | String  | Sensor   |         |                    |
| read_data                          | Read Data                            | String  | Actuator |         |                    |

## Occupied
The current state of the room. 
> Example: `False` means available (no person detected), while `True` means it's occupied (person inside).

## Activity Level
The activity level is an indication of the amount and duration of motion detected during the false/positive routine. The higher the number, the more activity has been detected by the sensor. This parameter can be used to tweak the activity level thresholds to finetune the sensor behaviour (see chapter 2.4.5 for more info).
> Example: A value of `186` means the device has detected a significant amount of activity (based on the amount and duration of motion sensor data). The value goes from 0 to 255.

## Temperature
Environmental temperature measured with the temperature sensor on board the device (if available).

## Relative Humidity
Environmental relative humidity measured with the humidity sensor on board the device (if available).

## Temperature Delta
The presence sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’ (= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the temperature sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `0.2` means sensor will trigger a LoRaWAN transmission whenever the temperature deviates at least 0.2°C since the last LoRaWAN transmission.

## Humidity Delta
The presence sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’ (= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place ([Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval)). This parameter configures the minimum difference needed for the humidity sensor to trigger a LoRaWAN transmission. When set to 0, this configuration is disabled (sensor can no longer trigger a LoRaWAN transmission).  
> Example: A value of `3` means the sensor will trigger a LoRaWAN transmission whenever the relative humidity deviates at least 3% since the last LoRaWAN transmission.

## Battery Percentage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health. This parameter will provide a percentage value, based on the voltage level.

## Battery Voltage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health.

## Sample Interval
The device will conduct measurements with its on-board sensors on an interval based on this configuration. This does NOT mean the sensor will report its measurements right away, this is either triggered on individual sensor thresholds ([Humidity Delta](#Humidity-Delta), [Temperature Delta](#temperature-delta)) or the [Minimum LoRaWAN Interval](#Minimum-LoRaWAN-Interval).  
> Example: A value of `600` means the device will trigger all its on-board sensors to conduct a measurement every 600 seconds.

## Activity Level Threshold (Primary)
The activity level is an indication of the amount and duration of motion detected during the false/positive routine ([Activity Level](#Activity-Level)). When the activity passes this threshold, the room is determined as occupied.  
> Example: A value of `127` means the activity level measured during the false/positive routine needs to be higher than 127 to determine the room is occupied.

## Activity Level Threshold (Secondary)
The activity level is an indication of the amount and duration of motion detected during the false/positive routine ([Activity Level](#Activity-Level)). Initially, the primary threshold is used to validate if the room is occupied ([Activity Level Threshold (Primary)](#activity-level-threshold-primary)). When the room is already deemed occupied, the secondary threshold can be used to allow a different threshold in subsequent false/positive routines. For instance, when monitoring a room: the person walking will initially cause a lot of activity, but once the person sits it will be significantly less. A lower secondary threshold makes sure this lower activity is still able to keep the room occupied even when there is less activity than when the room was first occupied.
> Example: A value of `40` means the activity level measured during the false/positive routine needs to be higher than 40 to keep the room occupied (after initially surpassing the [primary threshold](#activity-level-threshold-primary) during a previous false/positive routine).

## Validation Duration
The time (in seconds) the device will check for motion after leaving the deep sleep mode ([Sleep Duration](#sleep-duration)). The device will determine the room is available when this time has expired. Combined with the sleep duration, it determines the minimum duration the room will have the ‘occupied’ state.  
> Example: A value of `120` means that after leaving deep sleep mode, the device will enable triggers from the motion sensor again for 120 seconds and release the room again afterwards.

## Sleep Duration
The time (in seconds) the device will stay in deep sleep after the false/positive routine determined the room is occupied. The device will ignore any motion triggers during this time. The false/positive routine filters out any unwanted ‘occupied’ states by verifying the amount of motion in time. Combined with the [validation duration](#validation-duration), it determines the minimum duration the room will have the ‘occupied’ state.  
> Example: A value of `180` means that after a false/positive routine determined the room is occupied, the device will go into deep sleep mode for 180 seconds.

## Minimum LoRaWAN Interval
The presence sensor either triggers a LoRaWAN transmission on an on-board sensor ‘delta’(= difference compared to last LoRaWAN transmission value) or when a certain time has passed where no transmissions took place. This interval will prepare a LoRaWAN transmission whenever a certain time has passed even when the individual sensor delta’s have not been exceeded. This ensures the device will send a transmission even when the environment parameters are stable.  
> Example: A value of `3600` means the device will trigger a LoRaWAN transmission at least every 3600 seconds (1 hour), even when the sensor deltas are not exceeded.

## Heartbeat Interval
Heartbeats are special confirmed uplink messages that are sent to confirm the network connectivity from the perspective of the device. Normal uplink messages are ‘fire and forget’ messages. Meaning the messages are sent out and hopefully being picked up by a gateway to deliver to the server. The device cannot detect if the message was delivered to the server. With confirmed uplinks (like the heartbeat) the device expects an acknowledgement from the server after sending the uplink. Which tells the device the current connection is still valid. If these heartbeats are not acknowledged, the device will attempt a new join process to refresh the connection with the server.  
> Example: A value of `720` means the heartbeat interval is set to 720 minutes (= 12 hours).

## Forced LoRaWAN Rejoin Counter
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
> Example: Sending a string `"sleep_duration"` command will make the device send the data to populate the `sleep_duration` asset on the next LoRaWAN transmission.  
> **NOTE:** You can also send multiple asset names in a single message. Sending a string `"sleep_duration, hardware_version, firmware_version, validation_duration, heartbeat_interval"` will make the device send the data for all of those assets on the next LoRaWAN transmission.


# Example Payloads  
`050304130b0a0303000107e7010a092a18`  
`22182d23644600`  
`300aac322e`  
`46004700`  
`300a073234`  
`22183f23644600`  