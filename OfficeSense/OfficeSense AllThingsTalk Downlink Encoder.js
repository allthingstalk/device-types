function converter(code) {
    // AllThingsTalk
    // Version: 1.0.0
    var att_in = JSON.parse(code);
    var att_out = new Object();

    function decToHex(integer, size) {
        var number = (+integer).toString(16).toUpperCase();
        var requiredLength = size * 2;
        while (number.length < requiredLength) {
            number = "0" + number;
        }
        return number;
    }

    if ('heartbeat_interval' in att_in) {
        var value = att_in.heartbeat_interval.value;
        value = Math.min(Math.max(value, 1), 720);
        value = Math.floor(value);
        att_out.data = '10' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('lora_rejoin_count' in att_in) {
        var value = att_in.lora_rejoin_count.value;
        value = Math.min(Math.max(value, 100), 25000);
        value = Math.floor(value / 100);
        att_out.data = '12' + decToHex(value, 1);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('sleep_duration' in att_in) {
        var value = att_in.sleep_duration.value;
        value = Math.min(Math.max(value, 1), 43200);
        value = Math.floor(value);
        att_out.data = '42' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('validation_duration' in att_in) {
        var value = att_in.validation_duration.value;
        value = Math.min(Math.max(value, 1), 43200);
        value = Math.floor(value);
        att_out.data = '43' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('activity_threshold' in att_in) {
        var value = att_in.activity_threshold.value;
        value = Math.min(Math.max(value, 0), 255);
        value = Math.floor(value);
        att_out.data = '48' + decToHex(value, 1);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('threshold_hysteresis' in att_in) {
        var value = att_in.threshold_hysteresis.value;
        value = Math.min(Math.max(value, 0), 255);
        value = Math.floor(value);
        att_out.data = '49' + decToHex(value, 1);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('sample_interval' in att_in) {
        var value = att_in.sample_interval.value;
        value = Math.min(Math.max(value, 1), 43200);
        value = Math.floor(value);
        att_out.data = '61' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('temperature_delta' in att_in) {
        var value = att_in.temperature_delta.value;
        value = value * 100;
        value = Math.min(Math.max(value, 0), 5000);
        value = Math.floor(value);
        att_out.data = '62' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('humidity_delta' in att_in) {
        var value = att_in.humidity_delta.value;
        value = Math.min(Math.max(value, 0), 100);
        value = Math.floor(value);
        att_out.data = '63' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('co2_delta' in att_in) {
        var value = att_in.co2_delta.value;
        value = Math.min(Math.max(value, 0), 5000);
        value = Math.floor(value);
        att_out.data = '64' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('light_delta' in att_in) {
        var value = att_in.light_delta.value;
        value = Math.min(Math.max(value, 0), 65535);
        value = Math.floor(value);
        att_out.data = '65' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('sound_delta' in att_in) {
        var value = att_in.sound_delta.value;
        value = Math.min(Math.max(value, 0), 65535);
        value = Math.floor(value);
        att_out.data = '68' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('comfort_minimum_interval' in att_in) {
        var value = att_in.comfort_minimum_interval.value;
        value = Math.min(Math.max(value, 0), 43200);
        value = Math.floor(value);
        att_out.data = '67' + decToHex(value, 2);
        att_out.meta = { confirmed: true, port: 100 };
    }

    if ('read_data' in att_in) {
        var values = att_in.read_data.value.split(',');
        att_out.meta = { confirmed: false, port: 200 };
        att_out.data = '';

        var parameter_map = {
            'firmware_build': '01',
            'hardware_version': '02',
            'firmware_version': '03',
            'pcb_id': '04',
            'pcb_version': '05',
            'heartbeat_interval': '10',
            'lora_rejoin_count': '12',
            'battery_voltage': '22',
            'battery_percentage': '23',
            'fuota_status_id': '25',
            'fuota_status': '25',
            'fuota_src': '26',
            'fuota_dst': '27',
            'fuota_frag_total': '29',
            'temperature': '30',
            'humidity': '32',
            'co2': '33',
            'light': '34',
            'sound': '35',
            'o2': '36',
            'tau': '37',
            'sleep_duration': '42',
            'validation_duration': '43',
            'n_sample': '44',
            'n_positive': '45',
            'occupied': '46',
            'activity_level': '47',
            'activity_threshold': '48',
            'threshold_hysteresis': '49',
            'sample_interval': '61',
            'temperature_delta': '62',
            'humidity_delta': '63',
            'co2_delta': '64',
            'light_delta': '65',
            'co2_calibration_counter': '66',
            'comfort_minimum_interval': '67',
            'sound_delta': '68',
            'people_count_a': '80',
            'people_count_b': '81',
            'people_count_a_correction': '82',
            'people_count_b_correction': '83',
            'direction': '84',
            'bb_thresh_alarm': '91',
            'bb_thresh_warning': '92',
            'manual_trigger': '93',
            'o2_params': '9A'
        };

        values.forEach(function(value) {
            value = value.trim(); // Remove any extra spaces
            if (value in parameter_map) {
                att_out.data += parameter_map[value];
            }
        });
    }

    return JSON.stringify(att_out);
}