# BLE Tags
This directory contains the ABCL decoders for supported BLE (Bluetooth Low Energy) Tags. At the moment, BLE Tags work with select Digital Matter devices only.

# Tag Types
When a payload containing bluetooth tag data arrives from a Digital Matter device, it contains a `tt` (Tag Type) field, which tells us which tag it is. The following is a list of all possible tag types, provided by Digital Matter:

| Tag Type (TT) | Name                              |
|---------------|-----------------------------------|
| 0             | Digital Matter Guppy              |
| 1             | Apple iBeacon                     |
| 2             | Eddystone                         |
| 3             | Ingics iBS01 Basic                |
| 4             | Ingics iBS01 Temperature/Humidity |
| 5             | Digital Matter SensorNode         |
| 6             | Eddystone TLM Frame               |
| 7             | Technoton ES7 Fuel Sensor         |
| 8             | Geobox Ble TPMS Sensor            |
| 9             | Escort Ble Fuel Sensor            |
| 10            | Ingics iBS04                      |
| 11            | ELA MAG                           |
| 12            | ELA MOV                           |
| 13            | ELA ANG                           |
| 14            | ELA ID                            |
| 15            | ELA T                             |
| 16            | ELA RHT                           |
| 255           | Generic Tag                       |