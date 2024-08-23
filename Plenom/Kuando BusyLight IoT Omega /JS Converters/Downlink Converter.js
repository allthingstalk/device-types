function converter(code) {
    var att_in = JSON.parse(code);
    var att_out = new Object();

    function decToHex(integer) {
        var shouldAddZero = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        var number = (+integer).toString(16).toUpperCase();
        if (number.length % 2 > 0 && shouldAddZero) {
            number = "0" + number;
        }
        return number;
    };

    if ('color' in att_in) {
        var hexR = decToHex(att_in.color.value.r)
        var hexG = decToHex(att_in.color.value.g)
        var hexB = decToHex(att_in.color.value.b)
        // When using the color picker on the pinboard, it doesn't send the values below, so check if they're being sent and if not, use the defaults.
        var hexOnTime = decToHex(typeof att_in.color.value.on_time !== 'undefined' ? att_in.color.value.on_time : 255)
        var hexOffTime = decToHex(typeof att_in.color.value.off_time !== 'undefined' ? att_in.color.value.off_time : 0)

        att_out.data = hexR + hexB + hexG + hexOnTime + hexOffTime;
    }

    if ('factory_reset' in att_in) {
        if (att_in.factory_reset.value == 'true' || att_in.factory_reset.value == true) {
            att_out.data = 'AA00';
        }
    }

    if ('adr' in att_in) {
        if (att_in.adr.value == 'true' || att_in.adr.value == true) {
            att_out.data = '0100';
        } else if (att_in.adr.value == 'false' || att_in.adr.value == false) {
            att_out.data = '0200';
        }
    }

    if ('uplinks_without_downlink' in att_in) {
        att_out.data = '03' + decToHex(att_in.uplinks_without_downlink.value);
    }

    if ('uplink_interval' in att_in) {
        att_out.data = '04' + decToHex(att_in.uplink_interval.value);
    }

    if ('request_keepalive' in att_in) {
        if (att_in.request_keepalive.value == 'true' || att_in.request_keepalive.value == true) {
            att_out.data = '0500';
        }
    }
    
    if ('auto_uplink' in att_in) {
        if (att_in.auto_uplink.value == 'true' || att_in.auto_uplink.value == true) {
            att_out.data = '0601';
        } else if (att_in.auto_uplink.value == 'false' || att_in.auto_uplink.value == false) {
            att_out.data = '0600';
        }
    }

    att_out.meta = { confirmed: true, port: 15 };
    return JSON.stringify(att_out);
}