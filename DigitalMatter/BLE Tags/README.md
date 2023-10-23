# BLE Tags
This directory contains the ABCL decoders for supported BLE (Bluetooth Low Energy) Tags. At the moment, BLE Tags work with select Digital Matter devices only.

# Tag Types
When a payload containing bluetooth tag data arrives from a Digital Matter device, it contains a `tt` (Tag Type) field, which tells us which tag it is. The following is a list of all possible tag types, provided by Digital Matter:

| Tag Type (TT) | Name                              |
|---------------|-----------------------------------|
| 0             | [Digital Matter Guppy](Digital%20Matter%20Guppy) |
| 1             | [Apple iBeacon](Apple%20iBeacon)  |
| 2             | [Eddystone](Eddystone)            |
| 3             | [Ingics iBS01 Basic](Ingics%20iBS01%20Basic) |
| 4             | [Ingics iBS01 Temperature/Humidity](Ingics%20iBS01%20Temperature%20and%20Humidity) |
| 5             | Digital Matter SensorNode         |
| 6             | Eddystone TLM Frame               |
| 7             | Technoton ES7 Fuel Sensor         |
| 8             | Geobox Ble TPMS Sensor            |
| 9             | Escort Ble Fuel Sensor            |
| 10            | [Ingics iBS04](Ingics%20iBS04)    |
| 11            | [ELA MAG](ELA%20MAG)              |
| 12            | [ELA MOV](ELA%20MOV)              |
| 13            | [ELA ANG](ELA%20ANG)              |
| 14            | [ELA ID](ELA%20ID)                |
| 15            | [ELA T](ELA%20T)                  |
| 16            | [ELA RHT](ELA%20RHT)              |
| 255           | [Generic Tag](Generic%20Tag)      |