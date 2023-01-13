function converter(code) {
    var given_obj = JSON.parse(code);
    if ('targetTemperature' in given_obj) {
        return setTargetTemperature(given_obj.targetTemperature.value);
    }
    if ('uplinkType' in given_obj) {
        return setUplinkType(given_obj.uplinkType.value);
    }
    if ('temperatureRange' in given_obj) {
        return setTemperatureRange(given_obj.temperatureRange.min.value, given_obj.temperatureRange.max.value);
    }
    if ('operationalMode' in given_obj) {
        return setOperationalMode(given_obj.setOperationalMode.value);
    }
    if ('keepAliveTime' in given_obj) {
        return setKeepAlive(given_obj.keepAliveTime.value);
    }
    if ('joinRetryPeriod' in given_obj) {
        return setJoinRetryPeriod(given_obj.joinRetryPeriod.value);
    }
    if ('internalAlgoTdiffParams' in given_obj) {
        return setInternalAlgoTdiffParams(given.obj.internalAlgoTdiffParams.warm.value, given_obj.internalAlgoTdiffParams.cold.value);
    }
    if ('childLock' in given_obj) {
        return setChildLock(given_obj.childLock.value);
    }
    if ('openWindowParams' in given_obj) {
        return setOpenWindow(given_obj.openWindowParams.enabled.value, given_obj.openWindowParams.duration.value, given_obj.openWindowParams.motorPosition.value, given_obj.openWindowParams.delta.value);
    }
    if ('forceCloseValve' in given_obj) {
        if (given_obj.forceCloseValve.value == true) {
            return forceClose();
        }
    }
    if ('recalibrateMotor' in given_obj) {
        if (given_obj.recalibrateMotor.value == true) {
            return recalibrateMotor();
        }
    }
    if ('getAllParams' in given_obj) {
        return getAllParams();
    }


    function decToHex(integer) {
        var shouldAddZero = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var number = (+integer).toString(16).toUpperCase();
        if (number.length % 2 > 0 && shouldAddZero) {
            number = "0" + number;
        }
        return number;
    };

    function dec2hexWithZero(i) {
        return (i + 0x10000).toString(16).substr(-4).toUpperCase();
    };
    
    function toHex(cmdName, cmdId) {
        for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            params[_key - 2] = arguments[_key];
        }

        if (cmdName == "SetOpenWindow") return '0' + cmdId.toString(16) + params.reduce(function (paramString, param) {
            return paramString += param;
        }, "");else return '0' + cmdId.toString(16) + params.reduce(function (paramString, param) {
            return paramString += param;
        }, "");
    };

    function forceClose() {
        return toHex('ForceClose', 0x0B);
    };

    // TODO: This function doesn't work for some reason, it only reports some of the parameters back.
    function getAllParams() {
        // 14 - Get child lock
        // 16 - Get internal temperature control algo params
        // 17 - Get internal temperature control algo params - Tdiff
        // 12 - Get keepalive period
        // 13 - Get open window params
        // 18 - Get device online operational mode
        // 19 - Get network joiun retry period
        // 15 - Get temperature ranges
        // 1B - Get uplink messages type
        return toHex('GetAllParams', '14', '16', '17', '12', '13', '18', '19', '15', '1B');
    };

    // function getChildLock() {
    //     return toHex('GetChildLock', 0x14);
    // };

    // function getInternalAlgoParams() {
    //     return toHex('GetInternalAlgoParams', 0x16);
    // };

    // function getInternalAlgoTdiffParams() {
    //     return toHex('GetInternalAlgoTdiffParams', 0x17);
    // };

    // function getJoinRetryPeriod() {
    //     return toHex('GetJoinRetryPeriod', 0x19);
    // };

    // function getKeepAliveTime() {
    //     return toHex('GetKeepAliveTime', 0x12);
    // };

    // function getOpenWindowParams() {
    //     return toHex('GetOpenWindowParams', 0x13);
    // };

    // function getOperationalMode() {
    //     return toHex('GetOperationalMode', 0x18);
    // };

    // function getTemperatureRange() {
    //     return toHex('GetTemperatureRange', 0x15);
    // };

    // function getUplinkType() {
    //     return toHex('GetUplinkType', 0x1B);
    // };

    function recalibrateMotor() {
        return toHex('RecalibrateMotor', 0x03);
    };

    // function receivedKeepaliveCommand() {
    //     return toHex('ReceivedKeepalive', 0x55);
    // };

    function sendCustomHexCommand(command) {
        return toHex('SendCustomHexCommand', command);
    };

    function setChildLock(enabled) {
        var enabledValue = enabled ? 1 : 0;
        return toHex('SetChildLock', 0x07, decToHex(enabledValue));
    };

    function setInternalAlgoParams(period, pFirstLast, pNext) {
        return toHex('SetInternalAlgoParams', 0x0C, decToHex(period), decToHex(pFirstLast), decToHex(pNext));
    };

    function setInternalAlgoTdiffParams(warm, cold) {
        return toHex('SetInternalAlgoTdiffParams', 0x1A, decToHex(cold), decToHex(warm));
    };

    function setJoinRetryPeriod(period) {
        // period should be passed in minutes
        var periodToPass = period * 60 / 5;
        return toHex('SetJoinRetryPeriod', 0x10, parseInt(periodToPass).toString(16));
    };

    function setKeepAlive(time) {
        return toHex('SetKeepAlive', 0x02, parseInt(time).toString(16));
    };

    function setOpenWindow(enabled, duration, motorPosition, delta) {
        var enabledValue = enabled ? 1 : 0;
        var closeTimeValue = parseInt(duration) / 5;
        var motorPositionBin = "000000000000" + parseInt(motorPosition, 10).toString(2);
        motorPositionBin = motorPositionBin.substr(-12);
        var motorPositionFirstPart = parseInt(motorPositionBin.substr(4), 2, 16);
        var motorPositionSecondPart = parseInt(motorPositionBin.substr(0, 4), 2, 16);

        return toHex('SetOpenWindow', 0x06, decToHex(enabledValue), decToHex(closeTimeValue), decToHex(motorPositionFirstPart, false), decToHex(motorPositionSecondPart, false), decToHex(delta, false));
    };

    function setOperationalMode(mode) {
        return toHex('SetOperationalMode', 0x0D, mode);
    };

    function setTargetTemperature(targetTemperature) {
        return toHex('SetTargetTemperature', 0x0E, decToHex(targetTemperature));
    };

    // function setTargetTemperatureAndMotorPosition(motorPosition, targetTemperature) {
    //     return toHex('SetTargetTemperatureAndMotorPosition', 0x31, dec2hexWithZero(motorPosition), decToHex(targetTemperature));
    // };

    function setTemperatureRange(min, max) {
        return toHex('SetTemperatureRange', 0x08, decToHex(min), decToHex(max));
    };

    function setUplinkType(type) {
        return toHex('SetUplinkType', 0x11, type);
    };

    return "";
}