function converter(code) {
    var given_obj = JSON.parse(code);

    function decToHex(integer) {
        var shouldAddZero = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var number = (+integer).toString(16).toUpperCase();
        if (number.length % 2 > 0 && shouldAddZero) {
            number = "0" + number;
        }
        return number;
    };

    if ('color' in given_obj) {
        var hexR = decToHex(given_obj.color.value.r)
        var hexG = decToHex(given_obj.color.value.g)
        var hexB = decToHex(given_obj.color.value.b)
        var hexOnTime = decToHex(given_obj.color.value.on_time);
        var hexOffTime = decToHex(given_obj.color.value.off_time)

        return hexR + hexB + hexG + hexOnTime + hexOffTime; // Yes, it's RBG and not RGB.
    }

    if ('factory_reset' in given_obj) {
        if (given_obj.factory_reset.value == 'true' || given_obj.factory_reset.value == true) {
            return 'AA00';
        }
    }

    if ('adr' in given_obj) {
        if (given_obj.adr.value == 'true' || given_obj.adr.value == true) {
            return '0100';
        } else if (given_obj.adr.value == 'false' || given_obj.adr.value == false) {
            return '0200';
        }
    }

    if ('uplinks_without_downlink' in given_obj) {
        return '03' + decToHex(given_obj.uplinks_without_downlink.value);
    }

    if ('uplink_interval' in given_obj) {
        return '04' + decToHex(given_obj.uplink_interval.value);
    }

    if ('request_keepalive' in given_obj) {
        if (given_obj.request_keepalive.value == 'true' || given_obj.request_keepalive.value == true) {
            return '0500';
        }
    }
    
    if ('auto_uplink' in given_obj) {
        if (given_obj.auto_uplink.value == 'true' || given_obj.auto_uplink.value == true) {
            return '0601';
        } else if (given_obj.auto_uplink.value == 'false' || given_obj.auto_uplink.value == false) {
            return '0600';
        }
    }

    return "";
}