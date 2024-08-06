function converter(code) {

    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substring(c, c+2), 16));
        return bytes;
    }

    byteArrayToLong = function(/*byte[]*/byteArray, /*int*/from) {
        return byteArray[from] | (byteArray[from+1] << 8) | (byteArray[from+2] << 16) | (byteArray[from+3] << 24);
    };

    function busyLightUplink(input) {
        var att = new Object();

        if (input.length == 24) {
            att.rssi = { value: byteArrayToLong(input, 0) };
            att.snr = { value: byteArrayToLong(input, 4) };
            att.messages_received = { value: byteArrayToLong(input, 8) };
            att.messages_sent = { value: byteArrayToLong(input, 12) };
            att.color = { value: { r: input[16], g: input[18], b: input[17], on_time: input[19], off_time: input[20] }};
            att.sw_rev = { value: input[21] };
            att.hw_rev = { value: input[22] };
            if (input[23] == 0) {
                att.adr = { value: false };
            } else if (input[23] == 1) {
                att.adr = { value: true };
            }
        } else {
            return null;
        }

        return att;
    };

    return JSON.stringify(busyLightUplink(hexToBytes(code)))
}