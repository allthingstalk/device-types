# BLE Tags
This directory contains information, assets, example payloads and ABCL decoders for supported BLE (Bluetooth Low Energy) Tags. At the moment, BLE Tags work with select Digital Matter devices only.

# Usage
In order to use your BLE Tags with your Digital Matter device on ALSO IoT Platform, you'll first need to configure your Digital Matter device to scan for your type of BLE Tag. You'll do this over [OEMServer](https://www.oemserver.com/).

## Digital Matter OEM Server Configuration
- In the devices list, select your Digital Matter device that you wish to scan BLE Tags with
- Click **Parameters** > **Edit System Parameters**
- Click **+ Add Parameters** button and select **BLE Tag Scanning**
- Now, in the new **BLE Tag Scanning** tab, configure the following:
- Set "Scan On Trip Start" to **Yes**
- Set "Scan On Trip End" to **Yes**
- Set "In-Trip Scan Period (seconds)" to **600**
- Set "Upload On In-Trip Scan" to **Yes**
- Set "Out of Trip Scan Period (minutes)" to **20**
- Set "Upload On Out Of Trip Scan" to **Yes**
- If you're using an iBeacon or Eddystone tag, you can enable scanning for them by setting **Enable iBeacon Tags** and **Enable Eddystone Tags** to **Yes** respectively
- Open the dropdown list in any of the **Other Tag Type ***X***** and select your BLE Tag manufacturer. You can easily set your Digital Matter device to scan for multiple tag types (manufacturers) by opening other **Other Tag Type ***X***** dropdowns and selecting additional tag types.
- Save the configuration by clicking **Update** in the bottom right corner.

Your Digital Matter device will receive the new configuration the next time it reports its data, which shouldn't be long.

## ALSO IoT Platform Configuration
Once your Digital Matter device is confgured to scan for BLE Tags, it's time to add your tags to your ground on ALSO IoT Platform.

- Go to your ALSO IoT Platform ground
- Click **+ New Device**
- Select your BLE Tag from the catalog
- Once it is added, open the device from the device list
- Go to **Device Settings** (upper right corner) and open **General**
- You'll see a field **Hardware Unique ID** - you need to input the unique identifier of your BLE Tag here. In most cases, it's the MAC address, but make sure to write it without colons (e.g. "*0F8813A47FB1*")
- Save by clicking **Save** and you're done

Next time your Digital Matter device scans for BLE Tags, your BLE Tag device on ALSO IoT Platform will be updated to show all of its sensor data.


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