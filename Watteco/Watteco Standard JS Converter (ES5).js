// Latest update: 28. November 2022 - 14:25
function converter(code) {
	function UintToInt(Uint, Size) {
		if (Size === 2) {
			if ((Uint & 0x8000) > 0) {
				Uint = Uint - 0x10000;
			}
		}
		if (Size === 3) {
			if ((Uint & 0x800000) > 0) {
				Uint = Uint - 0x1000000;
			}
		}
		if (Size === 4) {
			if ((Uint & 0x80000000) > 0) {
				Uint = Uint - 0x100000000;
			}
		}

		return Uint;
	}

    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }

	function Bytes2Float32(bytes) {
		var sign = bytes & 0x80000000 ? -1 : 1;
		var exponent = (bytes >> 23 & 0xFF) - 127;
		var significand = bytes & ~(-1 << 23);

		if (exponent == 128) return sign * (significand ? Number.NaN : Number.POSITIVE_INFINITY);

		if (exponent == -127) {
			if (significand == 0) return sign * 0.0;
			exponent = -126;
			significand /= 1 << 22;
		} else significand = (significand | 1 << 23) / (1 << 23);

		return sign * significand * Math.pow(2, exponent);
	}

	// ----------------------------------------------------------------
	// ----------------------- FUNCTIONS PART -------------------------
	// ----------------------------------------------------------------

	/*
	* Int conversion directly from buffer with start index and required endianess 
	*
	* Type must be     : U8,I8,U16,I16,U24,I24,U32,I32,U40,I40,...,U56,I56,I64
	* LittleEndian if true either big endian
	*/
	function BytesToInt64(InBytes, StartIndex, Type, LittleEndian) {
		if (typeof LittleEndian == 'undefined') LittleEndian = false;

		var Signed = Type.substr(0, 1) != "U";
		var BytesNb = parseInt(Type.substr(1, 2), 10) / 8;
		var inc, start;
		var nb = BytesNb;

		if (LittleEndian) {
			inc = -1;
			start = StartIndex + BytesNb - 1;
		} else {
			inc = 1;
			start = StartIndex;
		}

		tmpInt64 = 0;
		for (j = start; nb > 0; j += inc, nb--) {
			tmpInt64 = (tmpInt64 << 8) + InBytes[j];
		}

		if (Signed && BytesNb < 8 && InBytes[start] & 0x80) tmpInt64 = tmpInt64 - (0x01 << BytesNb * 8);

		return tmpInt64;
	}

	/*
	* Float32 conversion directly from buffer with start index and required endianess 
	*
	* LittleEndian if true either big endian
	*/
	function BytesToFloat32(InBytes, StartIndex, LittleEndian) {

		if (typeof LittleEndian == 'undefined') LittleEndian = false;

		var buf = InBytes.slice(StartIndex, StartIndex + 4);
		if (!LittleEndian) buf.reverse();
		var f32a = new Float32Array(new Int8Array(buf).buffer);
		return f32a[0];
	}

	function decimalToHex(d, padding) {
		var hex = Number(d).toString(16).toUpperCase();
		padding = typeof padding === "undefined" || padding === null ? padding = 2 : padding;

		while (hex.length < padding) {
			hex = "0" + hex;
		}

		return "0x" + hex;
	}

	function parseHexString(str) {
		var result = [];
		while (str.length >= 2) {
			result.push(parseInt(str.substring(0, 2), 16));

			str = str.substring(2, str.length);
		}

		return result;
	}

	function byteToHex(b) {
		var hexChar = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
		return hexChar[b >> 4 & 0x0f] + hexChar[b & 0x0f];
	}

	function BytesToHexStr(buff) {
		var hexOctets = [];
		for (i = 0; i < buff.length; ++i) {
			hexOctets.push(byteToHex(buff[i], 2));
		}
		return hexOctets.join("");
	}

	function zeroPad(num, places) {
		return String(num).padStart(places, '0');
	}

	function Decoder(bytes) {
		// Decode an uplink message from a buffer
		// (array) of bytes to an object of fields.
		var decoded = {};
		var att = {};
		decoded.lora = {};

		port = 125;
		decoded.lora.port = port;

		// Get raw payload
		var bytes_len_ = bytes.length;
		var temp_hex_str = "";

		decoded.lora.payload = "";

		for (var j = 0; j < bytes_len_; j++) {
			temp_hex_str = bytes[j].toString(16).toUpperCase();
			if (temp_hex_str.length == 1) {
				temp_hex_str = "0" + temp_hex_str;
			}
			decoded.lora.payload += temp_hex_str;
			var date = new Date();
			decoded.lora.date = date.toISOString();
		}

		if (port === 125) {
			//batch
			batch = !(bytes[0] & 0x01);

			//trame standard
			if (batch === false) {
				decoded.zclheader = {};
				decoded.zclheader.report = "standard";
				att.zclheader_report = { value: decoded.zclheader.report };
				attributID = -1;
				cmdID = -1;
				clusterdID = -1;
				//endpoint
				decoded.zclheader.endpoint = (bytes[0] & 0xE0) >> 5 | (bytes[0] & 0x06) << 2;
				att.zclheader_endpoint = { value: decoded.zclheader.endpoint};
				//command ID
				cmdID = bytes[1];
				decoded.zclheader.cmdID = decimalToHex(cmdID, 2);
				att.aclheader_cmdID = { value: decoded.zclheader.cmdID };
				//Cluster ID
				clusterdID = bytes[2] * 256 + bytes[3];
				decoded.zclheader.clusterdID = decimalToHex(clusterdID, 4);
				att.zclheader_clusterID = { value: decoded.zclheader.clusterdID };

				// decode report and read atrtribut response
				if (cmdID === 0x0a | cmdID === 0x8a | cmdID === 0x01) {
					decoded.data = {};
					//Attribut ID 
					attributID = bytes[4] * 256 + bytes[5];
					decoded.zclheader.attributID = decimalToHex(attributID, 4);
					att.zclheader_attributID = { value: decoded.zclheader.attributID };

					if (cmdID === 0x8a) {
						decoded.zclheader.alarm = 1;
						att.zclheader_alarm = { value: decoded.zclheader.alarm };
					}
					//data index start
					if (cmdID === 0x0a | cmdID === 0x8a) index = 7;
					if (cmdID === 0x01) {
						index = 8;
						decoded.zclheader.status = bytes[6];
						att.zclheader_status = { value: decoded.zclheader.status };
					}

					//temperature
					if (clusterdID === 0x0402 & attributID === 0x0000) {
						decoded.data.temperature = UintToInt(bytes[index] * 256 + bytes[index + 1], 2) / 100;
						att.temperature = { value: decoded.data.temperature };
					}
					//humidity
					if (clusterdID === 0x0405 & attributID === 0x0000) {
						decoded.data.humidity = (bytes[index] * 256 + bytes[index + 1]) / 100;
						att.humidity = { value: decoded.data.humidity };
					}
					//binary input counter
					if (clusterdID === 0x000f & attributID === 0x0402) {
						decoded.data.counter = bytes[index] * 256 * 256 * 256 + bytes[index + 1] * 256 * 256 + bytes[index + 2] * 256 + bytes[index + 3];
						att.counter = { value: decoded.data.counter };
					}
					// binary input present value
					if (clusterdID === 0x000f & attributID === 0x0055) { 
						decoded.data.pin_state = !!bytes[index];
						att.pin_state = { value: decoded.data.pin_state };
					}
					//multistate output
					if (clusterdID === 0x0013 & attributID === 0x0055) { 
						decoded.data.value = bytes[index];
						att.value = { value: decoded.data.value };
					}
					// on/off present value
					if (clusterdID === 0x0006 & attributID === 0x0000) {
						state = bytes[index];
						if (state === 1) {
							decoded.data.state = "ON";
							att.state = { value: decoded.data.state };
						} else {
							decoded.data.state = "OFF";
							att.state = { value: decoded.data.state };
						}
					}
					//differential pressure
					if (clusterdID === 0x8008 & attributID === 0x0000) {
						decoded.data.differential_pressure = bytes[index] * 256 + bytes[index + 1];
						att.differential_pressure = { value: decoded.data.differential_pressure };
					}
					// multibinary input present value
					if (clusterdID === 0x8005 & attributID === 0x0000) {
						decoded.data.pin_state_1 = (bytes[index + 1] & 0x01) === 0x01;
						att.pin_state_1 = { value: decoded.data.pin_state_1 };
						decoded.data.pin_state_2 = (bytes[index + 1] & 0x02) === 0x02;
						att.pin_state_2 = { value: decoded.data.pin_state_2 };
						decoded.data.pin_state_3 = (bytes[index + 1] & 0x04) === 0x04;
						att.pin_state_3 = { value: decoded.data.pin_state_3 };
						decoded.data.pin_state_4 = (bytes[index + 1] & 0x08) === 0x08;
						att.pin_state_4 = { value: decoded.data.pin_state_4 };
						decoded.data.pin_state_5 = (bytes[index + 1] & 0x10) === 0x10;
						att.pin_state_5 = { value: decoded.data.pin_state_5 };
						decoded.data.pin_state_6 = (bytes[index + 1] & 0x20) === 0x20;
						att.pin_state_6 = { value: decoded.data.pin_state_6 };
						decoded.data.pin_state_7 = (bytes[index + 1] & 0x40) === 0x40;
						att.pin_state_7 = { value: decoded.data.pin_state_7 };
						decoded.data.pin_state_8 = (bytes[index + 1] & 0x80) === 0x80;
						att.pin_state_8 = { value: decoded.data.pin_state_8 };
						decoded.data.pin_state_9 = (bytes[index] & 0x01) === 0x01;
						att.pin_state_9 = { value: decoded.data.pin_state_9 };
						decoded.data.pin_state_10 = (bytes[index] & 0x02) === 0x02;
						att.pin_state_10 = { value: decoded.data.pin_state_10 };
					}
					//analog input
					if (clusterdID === 0x000c & attributID === 0x0055) {
						decoded.data.analog = Bytes2Float32(bytes[index] * 256 * 256 * 256 + bytes[index + 1] * 256 * 256 + bytes[index + 2] * 256 + bytes[index + 3]);
						att.analog = { value: decoded.data.analog };
					}

					//modbus 
					if (clusterdID === 0x8007 & attributID === 0x0001) {
						decoded.data.payload = "";
						decoded.data.modbus_payload = "";
						decoded.data.size = bytes[index];
						att.size = { value: decoded.data.size };
						decoded.data.modbus_float = 0; // 0: pas de décodage float 1: décodage float 2: décodage float 2word inversé
						for (var j = 0; j < decoded.data.size; j++) {

							temp_hex_str = bytes[index + j + 1].toString(16).toUpperCase();
							if (temp_hex_str.length == 1) {
								temp_hex_str = "0" + temp_hex_str;
							}
							decoded.data.payload += temp_hex_str;
							att.payload = { value: decoded.data.payload };

							if (j == 0) {
								decoded.data.modbus_address = bytes[index + j + 1];
								att.modbus_address = { value: decoded.data.modbus_address };
							} else if (j == 1) {
								decoded.data.modbus_commandID = bytes[index + j + 1];
								att.modbus_commandID = { value: decoded.data.modbus_commandID };
							} else if (j == 2) {
								decoded.data.modbus_size = bytes[index + j + 1];
								att.modbus_size = { value: decoded.data.modbus_size };
							} else {
								decoded.data.modbus_payload += temp_hex_str;
								att.modbus_payload = { value: decoded.data.modbus_payload };
								if (decoded.data.modbus_float == 1) {
									// big endian
									if (j == 3) { 
										decoded.data.fregister_00 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_00 = { value: decoded.data.fregister_00 };
									}
									if (j == 7) {
										decoded.data.fregister_01 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_01 = { value: decoded.data.fregister_01 };
									}
									if (j == 11) {
										decoded.data.fregister_02 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_02 = { value: decoded.data.fregister_02 };
									}
									if (j == 15) {
										decoded.data.fregister_03 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_03 = { value: decoded.data.fregister_03 };
									}
									if (j == 19) {
										decoded.data.fregister_04 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_04 = { value: decoded.data.fregister_04 };
									}
									if (j == 23) {
										decoded.data.fregister_05 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_05 = { value: decoded.data.fregister_05 };
									}
									if (j == 27) {
										decoded.data.fregister_06 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_06 = { value: decoded.data.fregister_06 };
									}
									if (j == 31) {
										decoded.data.fregister_07 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_07 = { value: decoded.data.fregister_07 };
									}
									if (j == 35) {
										decoded.data.fregister_08 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_08 = { value: decoded.data.fregister_08 };
									}
									if (j == 35) {
										decoded.data.fregister_09 = Bytes2Float32(bytes[index + j + 1] * 256 * 256 * 256 + bytes[index + j + 1 + 1] * 256 * 256 + bytes[index + j + 1 + 2] * 256 + bytes[index + j + 1 + 3]);
										att.fregister_09 = { value: decoded.data.fregister_09 };
									}
								}
								if (decoded.data.modbus_float == 2) {
									// float little endian 2 word
									if (j == 3) {
										decoded.data.fregister_00 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_00 = { value: decoded.data.fregister_00 };
									}
									if (j == 7) {
										decoded.data.fregister_01 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_01 = { value: decoded.data.fregister_01 };
									}
									if (j == 11) {
										decoded.data.fregister_02 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_02 = { value: decoded.data.fregister_02 };
									}
									if (j == 15) {
										decoded.data.fregister_03 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_03 = { value: decoded.data.fregister_03 };
									}
									if (j == 19) {
										decoded.data.fregister_04 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_04 = { value: decoded.data.fregister_04 };
									}
									if (j == 23) {
										decoded.data.fregister_05 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_05 = { value: decoded.data.fregister_05 };
									}
									if (j == 27) {
										decoded.data.fregister_06 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_06 = { value: decoded.data.fregister_06 };
									}
									if (j == 31) {
										decoded.data.fregister_07 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_07 = { value: decoded.data.fregister_07 };
									}
									if (j == 35) {
										decoded.data.fregister_08 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_08 = { value: decoded.data.fregister_08 };
									}
									if (j == 35) {
										decoded.data.fregister_09 = Bytes2Float32(bytes[index + j + 1] * 256 + bytes[index + j + 1 + 1] + bytes[index + j + 1 + 2] * 256 * 256 * 256 + bytes[index + j + 1 + 3] * 256 * 256);
										att.fregister_09 = { value: decoded.data.fregister_09 };
									}
								}
							}
						}
					}

					//multimodbus 
					if (clusterdID === 0x8009 & attributID === 0x0000) {
						decoded.data.payloads = "";
						decoded.data.size = bytes[index];
						att.size = { value: decoded.data.size };
						decoded.data.multimodbus_frame_series_sent = bytes[index + 1];
						att.multimodbus_frame_series_sent = { value: decoded.data.multimodbus_frame_series_sent };
						decoded.data.multimodbus_frame_number_in_series = (bytes[index + 2] & 0xE0) >> 5;
						att.multimodbus_frame_number_in_series = { value: decoded.data.multimodbus_frame_number_in_series };
						decoded.data.multimodbus_last_frame_of_series = (bytes[index + 2] & 0x1C) >> 2;
						att.multimodbus_last_frame_of_series = { value: decoded.data.multimodbus_last_frame_of_series };
						decoded.data.multimodbus_EP9 = (bytes[index + 2] & 0x01) === 0x01;
						att.multimodbus_EP9 = { value: decoded.data.multimodbus_EP9 };
						decoded.data.multimodbus_EP8 = (bytes[index + 2] & 0x02) === 0x02;
						att.multimodbus_EP8 = { value: decoded.data.multimodbus_EP8 };
						decoded.data.multimodbus_EP7 = (bytes[index + 3] & 0x80) === 0x80;
						att.multimodbus_EP7 = { value: decoded.data.multimodbus_EP7 };
						decoded.data.multimodbus_EP6 = (bytes[index + 3] & 0x40) === 0x40;
						att.multimodbus_EP6 = { value: decoded.data.multimodbus_EP6 };
						decoded.data.multimodbus_EP5 = (bytes[index + 3] & 0x20) === 0x20;
						att.multimodbus_EP5 = { value: decoded.data.multimodbus_EP5 };
						decoded.data.multimodbus_EP4 = (bytes[index + 3] & 0x10) === 0x10;
						att.multimodbus_EP4 = { value: decoded.data.multimodbus_EP4 };
						decoded.data.multimodbus_EP3 = (bytes[index + 3] & 0x08) === 0x08;
						att.multimodbus_EP3 = { value: decoded.data.multimodbus_EP3 };
						decoded.data.multimodbus_EP2 = (bytes[index + 3] & 0x04) === 0x04;
						att.multimodbus_EP2 = { value: decoded.data.multimodbus_EP2 };
						decoded.data.multimodbus_EP1 = (bytes[index + 3] & 0x02) === 0x02;
						att.multimodbus_EP1 = { value: decoded.data.multimodbus_EP1 };
						decoded.data.multimodbus_EP0 = (bytes[index + 3] & 0x01) === 0x01;
						att.multimodbus_EP0 = { value: decoded.data.multimodbus_EP0 };
						index2 = index + 4;
						without_header = 0;

						if (decoded.data.multimodbus_EP0 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP0_slaveID = bytes[index2];
								att.multimodbus_EP0_slaveID = { value: decoded.data.multimodbus_EP0_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP0_fnctID = bytes[index2];
								att.multimodbus_EP0_fnctID = { value: decoded.data.multimodbus_EP0_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP0_datasize = bytes[index2];
								att.multimodbus_EP0_datasize = { value: decoded.data.multimodbus_EP0_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP0_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP0_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP0_payload += temp_hex_str;
								att.multimodbus_EP0_payload = { value: decoded.data.multimodbus_EP0_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP0_datasize;
						}

						if (decoded.data.multimodbus_EP1 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP1_slaveID = bytes[index2];
								att.multimodbus_EP1_slaveID = { value: decoded.data.multimodbus_EP1_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP1_fnctID = bytes[index2];
								att.multimodbus_EP1_fnctID = { value: decoded.data.multimodbus_EP1_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP1_datasize = bytes[index2];
								att.multimodbus_EP1_datasize = { value: decoded.data.multimodbus_EP1_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP1_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP1_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP1_payload += temp_hex_str;
								att.multimodbus_EP1_payload = { value: decoded.data.multimodbus_EP1_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP1_datasize;
						}
						if (decoded.data.multimodbus_EP2 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP2_slaveID = bytes[index2];
								att.multimodbus_EP2_slaveID = { value: decoded.data.multimodbus_EP2_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP2_fnctID = bytes[index2];
								att.multimodbus_EP2_fnctID = { value: decoded.data.multimodbus_EP2_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP2_datasize = bytes[index2];
								att.multimodbus_EP2_datasize = { value: decoded.data.multimodbus_EP2_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP2_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP2_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP2_payload += temp_hex_str;
								att.multimodbus_EP2_payload = { value: decoded.data.multimodbus_EP2_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP2_datasize;
						}
						if (decoded.data.multimodbus_EP3 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP3_slaveID = bytes[index2];
								att.multimodbus_EP3_slaveID = { value: decoded.data.multimodbus_EP3_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP3_fnctID = bytes[index2];
								att.multimodbus_EP3_fnctID = { value: decoded.data.multimodbus_EP3_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP3_datasize = bytes[index2];
								att.multimodbus_EP3_datasize = { value: decoded.data.multimodbus_EP3_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP3_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP3_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP3_payload += temp_hex_str;
								att.multimodbus_EP3_payload = { value: decoded.data.multimodbus_EP3_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP3_datasize;
						}
						if (decoded.data.multimodbus_EP4 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP4_slaveID = bytes[index2];
								att.multimodbus_EP4_slaveID = { value: decoded.data.multimodbus_EP4_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP4_fnctID = bytes[index2];
								att.multimodbus_EP4_fnctID = { value: decoded.data.multimodbus_EP4_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP4_datasize = bytes[index2];
								att.multimodbus_EP4_datasize = { value: decoded.data.multimodbus_EP4_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP4_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP4_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP4_payload += temp_hex_str;
								att.multimodbus_EP4_payload = { value: decoded.data.multimodbus_EP4_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP4_datasize;
						}
						if (decoded.data.multimodbus_EP5 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP5_slaveID = bytes[index2];
								att.multimodbus_EP5_slaveID = { value: decoded.data.multimodbus_EP5_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP5_fnctID = bytes[index2];
								att.multimodbus_EP5_fnctID = { value: decoded.data.multimodbus_EP5_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP5_datasize = bytes[index2];
								att.multimodbus_EP5_datasize = { value: decoded.data.multimodbus_EP5_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP5_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP5_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP5_payload += temp_hex_str;
								att.multimodbus_EP5_payload = { value: decoded.data.multimodbus_EP5_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP5_datasize;
						}
						if (decoded.data.multimodbus_EP6 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP6_slaveID = bytes[index2];
								att.multimodbus_EP6_slaveID = { value: decoded.data.multimodbus_EP6_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP6_fnctID = bytes[index2];
								att.multimodbus_EP6_fnctID = { value: decoded.data.multimodbus_EP6_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP6_datasize = bytes[index2];
								att.multimodbus_EP6_datasize = { value: decoded.data.multimodbus_EP6_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP6_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP6_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP6_payload += temp_hex_str;
								att.multimodbus_EP6_payload = { value: decoded.data.multimodbus_EP6_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP6_datasize;
						}
						if (decoded.data.multimodbus_EP7 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP7_slaveID = bytes[index2];
								att.multimodbus_EP7_slaveID = { value: decoded.data.multimodbus_EP7_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP7_fnctID = bytes[index2];
								att.multimodbus_EP7_fnctID = { value: decoded.data.multimodbus_EP7_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP7_datasize = bytes[index2];
								att.multimodbus_EP7_datasize = { value: decoded.data.multimodbus_EP7_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP7_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP7_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP7_payload += temp_hex_str;
								att.multimodbus_EP7_payload = { value: decoded.data.multimodbus_EP7_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP7_datasize;
						}
						if (decoded.data.multimodbus_EP8 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP8_slaveID = bytes[index2];
								att.multimodbus_EP8_slaveID = { value: decoded.data.multimodbus_EP8_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP8_fnctID = bytes[index2];
								att.multimodbus_EP8_fnctID = { value: decoded.data.multimodbus_EP8_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP8_datasize = bytes[index2];
								att.multimodbus_EP8_datasize = { value: decoded.data.multimodbus_EP8_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP8_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP8_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP8_payload += temp_hex_str;
								att.multimodbus_EP8_payload = { value: decoded.data.multimodbus_EP8_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP8_datasize;
						}
						if (decoded.data.multimodbus_EP9 === true) {
							if (without_header === 0) {
								decoded.data.multimodbus_EP9_slaveID = bytes[index2];
								att.multimodbus_EP9_slaveID = { value: decoded.data.multimodbus_EP9_slaveID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP9_fnctID = bytes[index2];
								att.multimodbus_EP9_fnctID = { value: decoded.data.multimodbus_EP9_fnctID };
								index2 = index2 + 1;
								decoded.data.multimodbus_EP9_datasize = bytes[index2];
								att.multimodbus_EP9_datasize = { value: decoded.data.multimodbus_EP9_datasize };
								index2 = index2 + 1;
							}
							decoded.data.multimodbus_EP9_payload = "";
							if (bytes[index2] === undefined) return att;
							for (var j = 0; j < decoded.data.multimodbus_EP9_datasize; j++) {
								temp_hex_str = bytes[index2 + j].toString(16).toUpperCase();
								if (temp_hex_str.length == 1) {
									temp_hex_str = "0" + temp_hex_str;
								}
								decoded.data.multimodbus_EP9_payload += temp_hex_str;
								att.multimodbus_EP9_payload = { value: decoded.data.multimodbus_EP9_payload };
							}
							index2 = index2 + decoded.data.multimodbus_EP9_datasize;
						}
					}

					//simple metering
					if (clusterdID === 0x0052 & attributID === 0x0000) {
						decoded.data.active_energy_Wh = UintToInt(bytes[index + 1] * 256 * 256 + bytes[index + 2] * 256 + bytes[index + 3], 3);
						att.active_energy_Wh = { value: decoded.data.active_energy_Wh };
						decoded.data.reactive_energy_Varh = UintToInt(bytes[index + 4] * 256 * 256 + bytes[index + 5] * 256 + bytes[index + 6], 3);
						att.reactive_energy_Varh = { value: decoded.data.reactive_energy_Varh };
						decoded.data.nb_samples = bytes[index + 7] * 256 + bytes[index + 8];
						att.nb_samples = { value: decoded.data.nb_samples };
						decoded.data.active_power_W = UintToInt(bytes[index + 9] * 256 + bytes[index + 10], 2);
						att.active_power_W = { value: decoded.data.active_power_W };
						decoded.data.reactive_power_VAR = UintToInt(bytes[index + 11] * 256 + bytes[index + 12], 2);
						att.reactive_power_VAR = { value: decoded.data.reactive_power_VAR };
					}
					// lorawan message type
					if (clusterdID === 0x8004 & attributID === 0x0000) {
						if (bytes[index] === 1) {
							decoded.data.message_type = "confirmed";
							att.message_type = { value: decoded.data.message_type };
						}
						if (bytes[index] === 0) {
							decoded.data.message_type = "unconfirmed";
							att.message_type = { value: decoded.data.message_type };
						}
					}

					// lorawan retry
					if (clusterdID === 0x8004 & attributID === 0x0001) {
						decoded.data.nb_retry = bytes[index];
						att.nb_retry = { value: decoded.data.nb_retry };
					}

					// lorawan reassociation
					if (clusterdID === 0x8004 & attributID === 0x0002) {
						decoded.data.period_in_minutes = bytes[index + 1] * 256 + bytes[index + 2];
						att.period_in_minutes = { value: decoded.data.period_in_minutes };
						decoded.data.nb_err_frames = bytes[index + 3] * 256 + bytes[index + 4];
						att.nb_err_frames = { value: decoded.data.nb_err_frames };
					}
					// configuration node power desc
					if (clusterdID === 0x0050 & attributID === 0x0006) {
						index2 = index + 3;
						if ((bytes[index + 2] & 0x01) === 0x01) {
							decoded.data.main_or_external_voltage = (bytes[index2] * 256 + bytes[index2 + 1]) / 1000;index2 = index2 + 2;
							att.main_or_external_voltage = { value: decoded.data.main_or_external_voltage };
						}
						if ((bytes[index + 2] & 0x02) === 0x02) {
							decoded.data.rechargeable_battery_voltage = (bytes[index2] * 256 + bytes[index2 + 1]) / 1000;index2 = index2 + 2;
							att.rechargeable_battery_voltage = { value: decoded.data.rechargeable_battery_voltage };
						}
						if ((bytes[index + 2] & 0x04) === 0x04) {
							decoded.data.disposable_battery_voltage = (bytes[index2] * 256 + bytes[index2 + 1]) / 1000;index2 = index2 + 2;
							att.disposable_battery_voltage = { value: decoded.data.disposable_battery_voltage };
						}
						if ((bytes[index + 2] & 0x08) === 0x08) {
							decoded.data.solar_harvesting_voltage = (bytes[index2] * 256 + bytes[index2 + 1]) / 1000;index2 = index2 + 2;
							att.solar_harvesting_voltage = { value: decoded.data.solar_harvesting_voltage };
						}
						if ((bytes[index + 2] & 0x10) === 0x10) {
							decoded.data.tic_harvesting_voltage = (bytes[index2] * 256 + bytes[index2 + 1]) / 1000;index2 = index2 + 2;
							att.tic_harvesting_voltage = { value: decoded.data.tic_harvesting_voltage };
						}
					}
					//energy and power metering
					if (clusterdID === 0x800a & attributID === 0x0000) {
						index2 = index;
						decoded.data.sum_positive_active_energy_Wh = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.sum_positive_active_energy_Wh = { value: decoded.data.sum_positive_active_energy_Wh };
						index2 = index2 + 4;
						decoded.data.sum_negative_active_energy_Wh = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.sum_negative_active_energy_Wh = { value: decoded.data.sum_negative_active_energy_Wh };
						index2 = index2 + 4;
						decoded.data.sum_positive_reactive_energy_Wh = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.sum_positive_reactive_energy_Wh = { value: decoded.data.sum_positive_reactive_energy_Wh };
						index2 = index2 + 4;
						decoded.data.sum_negative_reactive_energy_Wh = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.sum_negative_reactive_energy_Wh = { value: decoded.data.sum_negative_reactive_energy_Wh };
						index2 = index2 + 4;
						decoded.data.positive_active_power_W = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.positive_active_power_W = { value: decoded.data.positive_active_power_W };
						index2 = index2 + 4;
						decoded.data.negative_active_power_W = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.negative_active_power_W = { value: decoded.data.negative_active_power_W };
						index2 = index2 + 4;
						decoded.data.positive_reactive_power_W = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.positive_reactive_power_W = { value: decoded.data.positive_reactive_power_W };
						index2 = index2 + 4;
						decoded.data.negative_reactive_power_W = UintToInt(bytes[index2 + 1] * 256 * 256 * 256 + bytes[index2 + 2] * 256 * 256 + bytes[index2 + 3] * 256 + bytes[index2 + 4], 4);
						att.negative_reactive_power_W = { value: decoded.data.negative_reactive_power_W };
					}
					//energy and power metering
					if (clusterdID === 0x800b & attributID === 0x0000) {
						index2 = index;
						decoded.data.Vrms = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vrms = { value: decoded.data.Vrms };
						index2 = index2 + 2;
						decoded.data.Irms = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Irms = { value: decoded.data.Irms };
						index2 = index2 + 2;
						decoded.data.phase_angle = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2);
						att.phase_angle = { value: decoded.data.phase_angle };
					}
					//concentration
					if (clusterdID === 0x800c & attributID === 0x0000) {
						decoded.data.Concentration = bytes[index] * 256 + bytes[index + 1];
						att.Concentration = { value: decoded.data.Concentration };
					}
					//illuminance
					if (clusterdID === 0x0400 & attributID === 0x0000) {
						decoded.data.Illuminance = bytes[index] * 256 + bytes[index + 1];
						att.Illuminance = { value: decoded.data.Illuminance };
					}
					//Pressure
					if (clusterdID === 0x0403 & attributID === 0x0000) {
						decoded.data.Pressure = UintToInt(bytes[index] * 256 + bytes[index + 1], 2);
						att.Pressure = { value: decoded.data.Pressure };
					}
					//Occupancy
					if (clusterdID === 0x0406 & attributID === 0x0000) {
						decoded.data.Occupancy = !!bytes[index];
						att.Occupancy = { value: decoded.data.Occupancy };
					}
					// power quality by WattSense
					if (clusterdID === 0x8052 & attributID === 0x0000) {
						index2 = index;
						decoded.data.frequency = (UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) + 22232) / 1000;
						att.frequency = { value: decoded.data.frequency };
						index2 = index2 + 2;
						decoded.data.frequency_min = (UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) + 22232) / 1000;
						att.frequency_min = { value: decoded.data.frequency_min };
						index2 = index2 + 2;
						decoded.data.frequency_max = (UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) + 22232) / 1000;
						att.frequency_max = { value: decoded.data.frequency_max };
						index2 = index2 + 2;
						decoded.data.Vrms = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vrms = { value: decoded.data.Vrms };
						index2 = index2 + 2;
						decoded.data.Vrms_min = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vrms_min = { value: decoded.data.Vrms_min };
						index2 = index2 + 2;
						decoded.data.Vrms_max = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vrms_max = { value: decoded.data.Vrms_max };
						index2 = index2 + 2;
						decoded.data.Vpeak = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vpeak = { value: decoded.data.Vpeak };
						index2 = index2 + 2;
						decoded.data.Vpeak_min = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vpeak_min = { value: decoded.data.Vpeak_min };
						index2 = index2 + 2;
						decoded.data.Vpeak_max = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2) / 10;
						att.Vpeak_max = { value: decoded.data.Vpeak_max };
						index2 = index2 + 2;
						decoded.data.over_voltage = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2);
						att.over_voltage = { value: decoded.data.over_voltage };
						index2 = index2 + 2;
						decoded.data.sag_voltage = UintToInt(bytes[index2 + 1] * 256 + bytes[index2 + 2], 2);
						att.sag_voltage = { value: decoded.data.sag_voltage };
					}

					//XYZ Acceleration : Last on XYZ
					if (clusterdID === 0x800f) {
						i = index + 1;
						if (attributID === 0x0000) {
							o = decoded.data.Last = {};
							o.NbTriggedAcq = BytesToInt64(bytes, i, "U32");i += 4;
							att.NbTriggedAcq = { value: o.NbTriggedAcq };
							o.Mean_X_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Mean_X_G = { value: o.Mean_X_G };
							o.Max_X_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Max_X_G = { value: o.Max_X_G };
							o.Dt_X_ms = BytesToInt64(bytes, i, "U16");i += 2;
							att.Dt_X_ms = { value: o.Dt_X_ms };
							o.Mean_Y_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Mean_Y_G = { value: o.Mean_Y_G };
							o.Max_Y_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Max_Y_G = { value: o.Max_Y_G };
							o.Dt_Y_ms = BytesToInt64(bytes, i, "U16");i += 2;
							att.Dt_Y_ms = { value: o.Dt_Y_ms };
							o.Mean_Z_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Mean_Z_G = { value: o.Mean_Z_G };
							o.Max_Z_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Max_Z_G = { value: o.Max_Z_G };
							o.Dt_Z_ms = BytesToInt64(bytes, i, "U16");
							att.Dt_Z_ms = { value: o.Dt_Z_ms };
						} else if (attributID === 0x0001 || attributID === 0x0002 || attributID === 0x0003) {
							ext = attributID === 0x0001 ? "Stats_X" : attributID === 0x0002 ? "Stats_Y" : "Stats_Z";
							o = decoded.data[ext] = {};
							att_temp = att[ext] = {};
							o.NbAcq = BytesToInt64(bytes, i, "U16");i += 2;
							att_temp.NbAcq = { value: o.NbAcq };
							o.MinMean_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MinMean_G = { value: o.MinMean_G };
							o.MinMax_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MinMax_G = { value: o.MinMax_G };
							o.MinDt = BytesToInt64(bytes, i, "U16");i += 2;
							att_temp.MinDt = { value: o.MinDt };
							o.MeanMean_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MeanMean_G = { value: o.MeanMean_G };
							o.MeanMax_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MeanMax_G = { value: o.MeanMax_G };
							o.MeanDt = BytesToInt64(bytes, i, "U16");i += 2;
							att_temp.MeanDt = { value: o.MeanDt };
							o.MaxMean_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MaxMean_G = { value: o.MaxMean_G };
							o.MaxMax_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att_temp.MaxMax_G = { value: o.MaxMax_G };
							o.MaxDt = BytesToInt64(bytes, i, "U16");i += 2;
							att_temp.MaxDt = { value: o.MaxDt };
						} else if (attributID === 0x8000) {
							o = decoded.data.Params = {};
							o.WaitFreq_Hz = BytesToInt64(bytes, i, "U16") / 10.0;i += 2;
							att.WaitFreq_Hz = { value: o.WaitFreq_Hz };
							o.AcqFreq_Hz = BytesToInt64(bytes, i, "U16") / 10.0;i += 2;
							att.AcqFreq_Hz = { value: o.AcqFreq_Hz };
							delay = BytesToInt64(bytes, i, "U16");i += 2;
							if (delay & 0x8000) delay = (delay & ~0x8000) * 60;
							o.NewWaitDelay_s = delay & 0x8000 ? delay = (delay & ~0x8000) * 60 : delay;
							att.NewWaitDelay_s = { value: o.NewWaitDelay_s };
							o.MaxAcqDuration_ms = BytesToInt64(bytes, i, "U16");i += 2;
							att.MaxAcqDuration_ms = { value: o.MaxAcqDuration_ms };
							o.Threshold_X_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Threshold_X_G = { value: o.Threshold_X_G };
							o.Threshold_Y_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Threshold_Y_G = { value: o.Threshold_Y_G };
							o.Threshold_Z_G = BytesToInt64(bytes, i, "U16") / 100.0;i += 2;
							att.Threshold_Z_G = { value: o.Threshold_Z_G };
							o.OverThrsh_Dt_ms = BytesToInt64(bytes, i, "U16");i += 2;
							att.OverThrsh_Dt_ms = { value: o.OverThrsh_Dt_ms };
							o.UnderThrsh_Dt_ms = BytesToInt64(bytes, i, "U16");i += 2;
							att.UnderThrsh_Dt_ms = { value: o.UnderThrsh_Dt_ms };
							o.Range_G = BytesToInt64(bytes, i, "U16") / 100;i += 2;
							att.Range_G = { value: o.Range_G };
							o.FilterSmoothCoef = BytesToInt64(bytes, i, "U8");i += 1;
							att.FilterSmoothCoef = { value: o.FilterSmoothCoef };
							o.FilterGainCoef = BytesToInt64(bytes, i, "U8");i += 1;
							att.FilterGainCoef = { value: o.FilterGainCoef };
							o = decoded.data.Params.WorkingModes = {};
							o.SignalEachAcq = bytes[i] & 0x80 ? "true" : "false";
							att.SignalEachAcq = { value: o.SignalEachAcq };
							o.RstAftStdRpt_X = bytes[i] & 0x01 ? "true" : "false";
							att.RstAftStdRpt_X = { value: o.RstAftStdRpt_X };
							o.RstAftStdRpt_Y = bytes[i] & 0x02 ? "true" : "false";
							att.RstAftStdRpt_Y = { value: o.RstAftStdRpt_Y };
							o.RstAftStdRpt_Z = bytes[i] & 0x04 ? "true" : "false";
							att.RstAftStdRpt_Z = { value: o.RstAftStdRpt_Z };
						}
					}
				}

				//decode configuration response
				if (cmdID === 0x07) {
					//AttributID
					attributID = bytes[6] * 256 + bytes[7];
					decoded.zclheader.attributID = decimalToHex(attributID, 4);
					att.zclheader_attributID = { value: decoded.zclheader.attributID };
					//status
					decoded.zclheader.status = bytes[4];
					att.zclheader_status = { value: decoded.zclheader.status };
					//batch
					decoded.zclheader.batch = bytes[5];
					att.zclheader_batch = { value: decoded.zclheader.batch };
				}

				//decode read configuration response
				if (cmdID === 0x09) {
					//AttributID
					attributID = bytes[6] * 256 + bytes[7];
					decoded.zclheader.attributID = decimalToHex(attributID, 4);
					att.zclheader_attributID = { value: decoded.zclheader.attributID };
					//status
					decoded.zclheader.status = bytes[4];
					att.zclheader_status = { value: decoded.zclheader.status };
					//batch
					decoded.zclheader.batch = bytes[5];
					att.zclheader_batch = { value: decoded.zclheader.batch };

					//AttributType
					decoded.zclheader.attribut_type = bytes[8];
					att.zclheader_attribut_type = { value: decoded.zclheader.attribut_type };
					
					//min
					decoded.zclheader.min = {};
					if ((bytes[9] & 0x80) === 0x80) {
						decoded.zclheader.min.value = (bytes[9] - 0x80) * 256 + bytes[10];
						att.zclheader_min_value = { value: decoded.zclheader.min.value };
						decoded.zclheader.min.unity = "minutes";
						att.zclheader_min_unity = { value: decoded.zclheader.min.unity };
					} else {
						decoded.zclheader.min.value = bytes[9] * 256 + bytes[10];
						att.zclheader_min_value = { value: decoded.zclheader.min.value };
						decoded.zclheader.min.unity = "seconds";
						att.zclheader_min_unity = { value: decoded.zclheader.min.unity };
					}
					//max
					decoded.zclheader.max = {};
					if ((bytes[11] & 0x80) === 0x80) {
						decoded.zclheader.max.value = (bytes[11] - 0x80) * 256 + bytes[12];
						att.zclheader_max_value = { value: decoded.zclheader.max.value };
						decoded.zclheader.max.unity = "minutes";
						att.zclheader_max_unity = { value: decoded.zclheader.max.unity };
					} else {
						decoded.zclheader.max.value = bytes[9] * 256 + bytes[10];
						att.zclheader_max_value = { value: decoded.zclheader.max.value };
						decoded.zclheader.max.unity = "seconds";
						att.zclheader_max_unity = { value: decoded.zclheader.max.unity };
					}
					decoded.lora.payload = "";
				}
			} else {
				decoded.batch = {};
				decoded.batch.report = "batch";
				att.batch_report = { value: decoded.batch.report };
			}
		}
		return att;
	}
	return JSON.stringify(Decoder(hexToBytes(code)));
}