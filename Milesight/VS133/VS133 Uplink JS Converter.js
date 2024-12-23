function converter(code) {
    total_in_chns = [0x03, 0x06, 0x09, 0x0c];
    total_out_chns = [0x04, 0x07, 0x0a, 0x0d];
    period_chns = [0x05, 0x08, 0x0b, 0x0e];

    function milesight(bytes) {
        var decoded = {};
        var att = new Object();

        for (var i = 0; i < bytes.length; ) {
            var channel_id = bytes[i++];
            var channel_type = bytes[i++];

            // LINE TOTAL IN
            if (includes(total_in_chns, channel_id) && channel_type === 0xd2) {
                var channel_in_name = "line_" + ((channel_id - total_in_chns[0]) / 3 + 1);
                decoded[channel_in_name + "_total_in"] = readUInt32LE(bytes.slice(i, i + 4));
                att[channel_in_name + "_total_in"] = { value: readUInt32LE(bytes.slice(i, i + 4)) };
                i += 4;
            }
            // LINE TOTAL OUT
            else if (includes(total_out_chns, channel_id) && channel_type === 0xd2) {
                var channel_out_name = "line_" + ((channel_id - total_out_chns[0]) / 3 + 1);
                decoded[channel_out_name + "_total_out"] = readUInt32LE(bytes.slice(i, i + 4));
                att[channel_out_name + "_total_out"] = { value: readUInt32LE(bytes.slice(i, i + 4)) };
                i += 4;
            }
            // LINE PERIOD
            else if (includes(period_chns, channel_id) && channel_type === 0xcc) {
                var channel_period_name = "line_" + ((channel_id - period_chns[0]) / 3 + 1);
                decoded[channel_period_name + "_period_in"] = readUInt16LE(bytes.slice(i, i + 2));
                decoded[channel_period_name + "_period_out"] = readUInt16LE(bytes.slice(i + 2, i + 4));
                att[channel_period_name + "_period_in"] = { value: readUInt16LE(bytes.slice(i, i + 2)) };
                att[channel_period_name + "_period_out"] = { value: readUInt16LE(bytes.slice(i + 2, i + 4)) };
                i += 4;
            }
            // REGION COUNT
            else if (channel_id === 0x0f && channel_type === 0xe3) {
                decoded.region_1_count = readUInt8(bytes[i]);
                decoded.region_2_count = readUInt8(bytes[i + 1]);
                decoded.region_3_count = readUInt8(bytes[i + 2]);
                decoded.region_4_count = readUInt8(bytes[i + 3]);
                att.region_1_count = { value: readUInt8(bytes[i]) };
                att.region_2_count = { value: readUInt8(bytes[i + 1]) };
                att.region_3_count = { value: readUInt8(bytes[i + 2]) };
                att.region_4_count = { value: readUInt8(bytes[i + 3]) };
                i += 4;
            }
            // REGION DWELL TIME
            else if (channel_id === 0x10 && channel_type === 0xe4) {
                var dwell_channel_name = "region_" + bytes[i];
                decoded[dwell_channel_name + "_avg_dwell"] = readUInt16LE(bytes.slice(i + 1, i + 3));
                decoded[dwell_channel_name + "_max_dwell"] = readUInt16LE(bytes.slice(i + 3, i + 5));
                att[dwell_channel_name + "_avg_dwell"] = { value: readUInt16LE(bytes.slice(i + 1, i + 3)) };
                att[dwell_channel_name + "_max_dwell"] = { value: readUInt16LE(bytes.slice(i + 3, i + 5)) };
                i += 5;
            } else {
                break;
            }
        }

        return att;
    }

    function readUInt8(bytes) {
        return bytes & 0xff;
    }

    function readUInt16LE(bytes) {
        var value = (bytes[1] << 8) + bytes[0];
        return value & 0xffff;
    }

    function readUInt32LE(bytes) {
        var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
        return (value & 0xffffffff) >>> 0;
    }

    function includes(datas, value) {
        var size = datas.length;
        for (var i = 0; i < size; i++) {
            if (datas[i] == value) {
                return true;
            }
        }
        return false;
    }

    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substring(c, c+2), 16));
        return bytes;
    }

    return JSON.stringify(milesight(hexToBytes(code)))
}