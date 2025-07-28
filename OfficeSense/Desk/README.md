# Capgemini/HEAD Electronics OfficeSense Desk Sensor

Use the string asset `Read Data` if you wish to request any parameter or sensor state from the device by sending the name of the asset(s) you wish to be populated.  
For example, sending a string `"sleep_duration"` command via the `read_data` asset will make the device send the data to populate the `sleep_duration` asset on the next uplink.  
You can also send multiple asset names in a single message. For example, sending a string `"sleep_duration, hardware_version, firmware_version, validation_duration, heartbeat_interval"` will make the device send the data for all of those assets on the next uplink.

# Assets
| Name                               | Display Name                         | Type    | Kind     | Unit    | Additional         |
|------------------------------------|--------------------------------------|---------|----------|---------|--------------------|
| [occupied](#occupied)                           | Occupied                             | Boolean | Sensor   |         |                    |
| [activity_level](#activity-level)                     | Activity Level                       | Integer | Sensor   |         |                    |
| [battery_percentage](#battery-percentage)                 | Battery Percentage                   | Integer | Sensor   | %       | Min: 0, Max: 100   |
| [battery_voltage](#battery-voltage)                    | Battery Voltage                      | Number  | Sensor   | V       | Min: 0             |
| [activity_threshold](#activity-level-threshold-primary)                 | Activity Level Threshold (Primary)   | Integer | Actuator |         | Min: 0, Max: 255   |
| [threshold_hysteresis](#activity-level-threshold-secondary)               | Activity Level Threshold (Secondary) | Integer | Actuator |         | Min: 0, Max: 255   |
| [validation_duration](#validation-duration)                | Validation Duration                  | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| [sleep_duration](#sleep-duration)                     | Sleep Duration                       | Integer | Actuator | seconds | Min: 1, Max: 43200 |
| [heartbeat_interval](#heartbeat-interval)                 | Heartbeat Interval                   | Integer | Actuator | minutes | Min: 1, Max: 720   |
| [lora_rejoin_count](#forced-lorawan-rejoin-counter)                  | Forced LoRaWAN Rejoin Counter        | Integer | Actuator | uplinks | Min: 100, Max: 25000|
| [hardware_version](#hardware-version)                   | Hardware Version                     | String  | Sensor   |         |                    |
| [firmware_version](#firmware-version)                   | Firmware Version                     | String  | Sensor   |         |                    |
| [pcb_id](#pcb-id)                             | PCB ID                               | String  | Sensor   |         |                    |
| [pcb_version](#pcb-version)                        | PCB Version                          | String  | Sensor   |         |                    |
| [firmware_build](#firmware-build-timestamp)                     | Firmware Build Timestamp             | String  | Sensor   |         |                    |
| [read_data](#read-data)                          | Read Data                            | String  | Actuator |         |                    |

## Occupied
The current state of the desk. 
> Example: `False` means available (no person detected), while `True` means it's occupied (person inside).

## Activity Level
The activity level is an indication of the amount and duration of motion detected during the false/positive routine. The higher the number, the more activity has been detected by the sensor. This parameter can be used to tweak the activity level thresholds to finetune the sensor behaviour (see chapter 2.4.5 for more info).
> Example: A value of `186` means the device has detected a significant amount of activity (based on the amount and duration of motion sensor data). The value goes from 0 to 255.

## Battery Percentage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health. This parameter will provide a percentage value, based on the voltage level.

## Battery Voltage
Battery operated devices have the means to measure the voltage of the batteries which can be used as an indication of the current battery health.

## Activity Level Threshold (Primary)
The activity level is an indication of the amount and duration of motion detected during the false/positive routine ([Activity Level](#Activity-Level)). When the activity passes this threshold, the desk is determined as occupied.  
> Example: A value of `127` means the activity level measured during the false/positive routine needs to be higher than 127 to determine the desk is occupied.

## Activity Level Threshold (Secondary)
The activity level is an indication of the amount and duration of motion detected during the false/positive routine ([Activity Level](#Activity-Level)). Initially, the primary threshold is used to validate if the desk is occupied ([Activity Level Threshold (Primary)](#activity-level-threshold-primary)). When the desk is already deemed occupied, the secondary threshold can be used to allow a different threshold in subsequent false/positive routines. For instance, when monitoring a desk: the person taking place at the desk will initially cause a lot of activity, but once there it will be significantly less. A lower secondary threshold makes sure this lower activity is still able to keep the desk occupied even when there is less activity than when the desk was first occupied.
> Example: A value of `40` means the activity level measured during the false/positive routine needs to be higher than 40 to keep the desk occupied (after initially surpassing the [primary threshold](#activity-level-threshold-primary) during a previous false/positive routine).

## Validation Duration
The time (in seconds) the device will check for motion after leaving the deep sleep mode ([Sleep Duration](#sleep-duration)). The device will determine the desk is available when this time has expired. Combined with the sleep duration, it determines the minimum duration the desk will have the ‘occupied’ state.  
> Example: A value of `120` means that after leaving deep sleep mode, the device will enable triggers from the motion sensor again for 120 seconds and release the desk again afterwards.

## Sleep Duration
The time (in seconds) the device will stay in deep sleep after the false/positive routine determined the desk is occupied. The device will ignore any motion triggers during this time. The false/positive routine filters out any unwanted ‘occupied’ states by verifying the amount of motion in time. Combined with the [validation duration](#validation-duration), it determines the minimum duration the desk will have the ‘occupied’ state.  
> Example: A value of `180` means that after a false/positive routine determined the desk is occupied, the device will go into deep sleep mode for 180 seconds.

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
> Example: Sending a string `"sleep_duration"` command will make the device send the data to populate the `sleep_duration` asset on the next LoRaWAN transmission.  
> **NOTE:** You can also send multiple asset names in a single message. Sending a string `"sleep_duration, hardware_version, firmware_version, validation_duration, heartbeat_interval"` will make the device send the data for all of those assets on the next LoRaWAN transmission.



# Example Payloads  
`0563046363630303000107e7010a092e0a`  
`2218212364`  
`3009b032343301d9343cf035003d`  
`3009e2323533022e3412de350039`  
`3009e1323a3301c0341c49350034`  
`3009e1323a3301c0341c49350034`  