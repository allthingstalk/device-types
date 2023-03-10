function converter(code) {
    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substring(c, c+2), 16));
        return bytes;
    }

    function vickiDecode(input) {
        var bytes = input;
        var data = {};
        var resultToPass = {};
        toBool = function (value) { return value == '1' };

        function merge_obj(obj1, obj2) {
            var obj3 = {};
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            for (var attrname2 in obj2) { obj3[attrname2] = obj2[attrname2]; }
            return obj3;
        }

        function handleKeepalive(bytes, data){
            tmp = ("0" + bytes[6].toString(16)).substr(-2);
            motorRange1 = tmp[1];
            motorRange2 = ("0" + bytes[5].toString(16)).substr(-2);
            motorRange = parseInt("0x" + motorRange1 + motorRange2, 16);

            motorPos2 = ("0" + bytes[4].toString(16)).substr(-2);
            motorPos1 = tmp[0];
            motorPosition = parseInt("0x" + motorPos1 + motorPos2, 16);

            batteryTmp = ("0" + bytes[7].toString(16)).substr(-2)[0];
            batteryVoltageCalculated = 2 + parseInt("0x" + batteryTmp, 16) * 0.1;

            decbin = function (number) {
                if (number < 0) {
                    number = 0xFFFFFFFF + number + 1;
                }
                return parseInt(number, 10).toString(2);
            };
            byteBin = decbin(bytes[7].toString(16));
            openWindow = byteBin.substr(4, 1);
            childLockBin = decbin(bytes[8].toString(16));
            childLock = childLockBin.charAt(0);
            highMotorConsumption = byteBin.substr(-2, 1);
            lowMotorConsumption = byteBin.substr(-3, 1);
            brokenSensor = byteBin.substr(-4, 1);
            var sensorTemp = 0;
            if (Number(bytes[0].toString(16))  == 1) {
                sensorTemp = (bytes[2] * 165) / 256 - 40;
            }

            if (Number(bytes[0].toString(16)) == 81) {
                sensorTemp = (bytes[2] - 28.33333) / 5.66666;
            }
            data.reason = { value: Number(bytes[0].toString(16)) };
            data.targetTemperature = { value: Number(bytes[1]) };
            data.sensorTemperature = { value: Number(sensorTemp.toFixed(2)) };
            data.relativeHumidity = { value: Number(((bytes[3] * 100) / 256).toFixed(2)) };
            data.motorRange = { value: motorRange };
            data.motorPosition = { value: motorPosition };
            data.batteryVoltage = { value: Number(batteryVoltageCalculated.toFixed(2)) };
            data.openWindow = { value: toBool(openWindow) };
            data.childLock = { value: toBool(childLock) };
            data.highMotorConsumption = { value: toBool(highMotorConsumption) };
            data.lowMotorConsumption = { value: toBool(lowMotorConsumption) };
            data.brokenSensor = { value: toBool(brokenSensor) };

            return data;
        }
    
        function handleResponse(bytes, data){
            var commands = bytes.map(function(byte, i){
                return ("0" + byte.toString(16)).substr(-2); 
            });
            commands = commands.slice(0,-9);
            var command_len = 0;

            commands.map(function (command, i) {
                switch (command) {
                    case '04':
                        {
                            command_len = 2;
                            var hardwareVersion = commands[i + 1];
                            var softwareVersion = commands[i + 2];
                            var dataK = { deviceVersions: { value: { hardware: Number(hardwareVersion), software: Number(softwareVersion) } } };
                            resultToPass = merge_obj(resultToPass, dataK);
                        }
                    break;
                    case '12':
                        {
                            command_len = 1;
                            var dataC = { keepAliveTime: { value: parseInt(commands[i + 1], 16) } };
                            resultToPass = merge_obj(resultToPass, dataC);
                        }
                    break;
                    case '13':
                        {
                            command_len = 4;
                            var enabled = toBool(parseInt(commands[i + 1], 16));
                            var duration = parseInt(commands[i + 2], 16) * 5;
                            var tmp = ("0" + commands[i + 4].toString(16)).substr(-2);
                            var motorPos2 = ("0" + commands[i + 3].toString(16)).substr(-2);
                            var motorPos1 = tmp[0];
                            var motorPosition = parseInt('0x' + motorPos1 + motorPos2, 16);
                            var delta = Number(tmp[1]);

                            var dataD = { openWindowParams: { value: { enabled: enabled, duration: duration, motorPosition: motorPosition, delta: delta } } };
                            resultToPass = merge_obj(resultToPass, dataD);
                        }
                    break;
                    case '14':
                        {
                            command_len = 1;
                            var dataB = { childLock: { value: toBool(parseInt(commands[i + 1], 16)) } };
                            resultToPass = merge_obj(resultToPass, dataB);
                        }
                    break;
                    case '15':
                        {
                            command_len = 2;
                            var dataA = { temperatureRange: { value: { min: parseInt(commands[i + 1], 16), max: parseInt(commands[i + 2], 16) } } };
                            resultToPass = merge_obj(resultToPass, dataA);
                        }
                    break;
                    case '16':
                        {
                            command_len = 2;
                            var data = { internalAlgoParams: { value: { period: parseInt(commands[i + 1], 16), pFirstLast: parseInt(commands[i + 2], 16), pNext: parseInt(commands[i + 3], 16) } } };
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    case '17':
                        {
                            command_len = 2;
                            var dataF = { internalAlgoTdiffParams: { value: { warm: parseInt(commands[i + 1], 16), cold: parseInt(commands[i + 2], 16) } } };
                            resultToPass = merge_obj(resultToPass, dataF);
                        }
                    break;
                    case '18':
                        {
                            command_len = 1;
                            var dataE = { operationalMode: { value: parseInt(commands[i + 1], 16) } };
                            resultToPass = merge_obj(resultToPass, dataE);
                        }
                    break;
                    case '19':
                        {
                            command_len = 1;
                            var commandResponse = parseInt(commands[i + 1], 16);
                            var periodInMinutes = commandResponse * 5 / 60;
                            var dataH = { joinRetryPeriod: { value: periodInMinutes } };
                            resultToPass = merge_obj(resultToPass, dataH);
                        }
                    break;
                    case '1b':
                        {
                            command_len = 1;
                            var dataG = { uplinkType: { value: parseInt(commands[i + 1], 16) } };
                            resultToPass = merge_obj(resultToPass, dataG);
                        }
                    break;
                    case '1d':
                        {
                            // get default keepalive if it is not available in data
                            command_len = 2;
                            var deviceKeepAlive = 5;
                            var wdpC = commands[i + 1] == '00' ? false : commands[i + 1] * deviceKeepAlive + 7;
                            var wdpUc = commands[i + 2] == '00' ? false : parseInt(commands[i + 2], 16);
                            var dataJ = { watchDogParams: { value: { wdpC: wdpC, wdpUc: wdpUc } } };
                            resultToPass = merge_obj(resultToPass, dataJ);
                        }
                    break;
                    case '1f':
                        {
                            command_len = 1;
                            var data = { primaryOperationalMode: {value: commands[i + 1] } };
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    case '21':
                        {
                            command_len = 6;
                            var data = { batteryRangesBoundaries: { value: {
                                Boundary1: parseInt(commands[i + 1] + commands[i + 2], 16), 
                                Boundary2: parseInt(commands[i + 3] + commands[i + 4], 16), 
                                Boundary3: parseInt(commands[i + 5] + commands[i + 6], 16)
                            }}};
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    case '23':
                        {
                            command_len = 4;
                            var data = { batteryRangesOverVoltage: { value: {
                                Range1: parseInt(commands[i + 2], 16), 
                                Range2: parseInt(commands[i + 3], 16), 
                                Range3: parseInt(commands[i + 4], 16)
                            }}};
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    case '27':
                        {
                            command_len = 1;
                            var data = { OVAC: { value: parseInt(commands[i + 1], 16) } };
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    case '28':
                        {
                            command_len = 1;
                            var data = { manualTargetTemperatureUpdate: { value: parseInt(commands[i + 1], 16) } };
                            resultToPass = merge_obj(resultToPass, data);

                        }
                    break;
                    case '29':
                        {
                            command_len = 2;
                            var data = { proportionalAlgoParams: { value: { coefficient: parseInt(commands[i + 1], 16), period: parseInt(commands[i + 2], 16) } } };
                            resultToPass = merge_obj(resultToPass, data);

                        }
                    break;
                    case '2b':
                        {
                            command_len = 1;
                            var data = { algoType: { value: commands[i + 1] } };
                            resultToPass = merge_obj(resultToPass, data);
                        }
                    break;
                    default:
                        break;
                }
                commands.splice(i,command_len);
            });
            return resultToPass;
        }
        
        if (bytes[0].toString(16) == 1 || bytes[0].toString(16) == 129) {
            data = merge_obj(data, handleKeepalive(bytes, data));
        }else{
            data = merge_obj(data, handleResponse(bytes, data));
            bytes = bytes.slice(-9);
            data = merge_obj(data, handleKeepalive(bytes, data));
        }

        return data;
    }
    return JSON.stringify(vickiDecode(hexToBytes(code)));
}