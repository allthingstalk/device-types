function converter(code) {
    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
        return bytes;
    }
    function DecodeMeteoHelixPayload(data) {
        var pos = 0;
        var bindata = "";

        var ConvertBase = function (num) {
            return {
                from : function (baseFrom) {
                    return {
                        to : function (baseTo) {
                            return parseInt(num, baseFrom).toString(baseTo);
                        }
                    };
                }
            };
        };

        function pad(num) {
            var s = "0000000" + num;
            return s.slice(-8);
        }

        ConvertBase.dec2bin = function (num) {
            return pad(ConvertBase(num).from(10).to(2));
        };

        ConvertBase.bin2dec = function (num) {
            return ConvertBase(num).from(2).to(10);
        };

        function data2bits(data) {
            var binary = "";
            for(var i=0; i<data.length; i++) {
                binary += ConvertBase.dec2bin(data[i]);
            }
            return binary;
        }

        function bitShift(bits) {
            var num = ConvertBase.bin2dec(bindata.substr(pos, bits));
            pos += bits;
            return Number(num);
        }

        function precisionRound(number, precision) {
            var factor = Math.pow(10, precision);
            var djoka = Math.round(number * factor) / factor;
            return djoka
        }

        function Decoder(bytes) {
            bindata = data2bits(bytes);

            var obj = {};
            //if(bytes.length != 12) return {"status": "ERROR", "describtion": "11 bytes are required"}
            obj.type = {value: bitShift(2)};
            obj.battery = {value: precisionRound(bitShift(5)*0.05+3, 2)};
            obj.Temperature = {value: precisionRound(bitShift(11)*0.1-100, 1)};
            obj.T_min = {value: precisionRound(obj.Temperature.value - bitShift(6)*0.1, 1)};
            obj.T_max = {value: precisionRound(obj.Temperature.value + bitShift(6)*0.1, 1)};
            obj.Humidity = {value: precisionRound(bitShift(9)*0.2, 1)};
            obj.Pressure = {value: bitShift(14)*5+50000};
            obj.Irradiation = {value: bitShift(10)*2};
            obj.Irr_max = {value: obj.Irradiation.value + bitShift(9)*2};
            obj.Rain = {value: precisionRound(bitShift(8), 1)};
            obj.Rain_min_time = {value: precisionRound(bitShift(8), 1)};
            return obj;
        }
        return Decoder(data)
    }
    return JSON.stringify(DecodeMeteoHelixPayload(hexToBytes(code)));
}