# Device Types

> **Disclaimer:** Please keep in mind this repository is for internal use and has been made public for the sole reason that it may help somebody.

This repository contains:
- Our active and in development payload converters (this can include **ABCL** and/or **JavaScript** converters)  
- Assets for device types
- General information about devices
- Example payloads for said devices

When writing/using a JavaScript converter, make sure they're ES5 because our platform doesn't support ES6 for payload conversion. You can use [this online JavaScript conversion tool](https://es6console.com/) to convert JS ES6 code into ES5.  

> To test a JavaScript decoder, you can use your browser:  
> - Press F12 (or right click > Inspect)  
> - Switch to **Console** tab  
> - Clear the console by clicking the trashcan icon  
> - Paste the whole JavaScript converter in the console and press Enter  
> - Call the converter function using `converter('PAYLOAD')`, where `PAYLOAD` is the HEX payload (without spaces) from a device.  


[To easily generate a markdown table (for asset list), use this](https://www.tablesgenerator.com/markdown_tables).