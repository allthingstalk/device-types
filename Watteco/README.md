# Watteco

[Watteco device-specific standard + batch (combo) uplink decoders are available here](https://github.com/TheThingsNetwork/lorawan-devices/blob/master/vendor/nke-watteco/). The decoders present in this directory are based on those, but modified to fit our platform. 

> We couldn't implement a JS downlink complex enough to configure Watteco devices using assets since they are pretty complex.  
Because of this, Watteco device types will have a String asset named ***RawDownlink***, which is used to send the raw FRAME (hex payload) that is used to configure the device.  
In order to generate the configuration payload, use [Watteco's online Frame Encoder tool](https://support.nke.fr/Lora/LoraEncoder/).  
The output of this tool should be pasted into the actuator asset "RawDownlink".