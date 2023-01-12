function converter(code) {
    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substring(c, c+2), 16));
        return bytes;
    }

    function decodeMeteoWindPayload(data) {
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
        return Math.round(number * factor) / factor;
        }

        function Decoder(bytes) {
            bindata = data2bits(bytes);
            
            if(bytes.length != 9) return {"status": "ERROR", "description": "9 bytes are required"};
            var obj = {};
            obj.type =  {value: bitShift(2)};
            obj.battery = {value: precisionRound(bitShift(5)*0.05+3, 1)};
            obj.wind_ave10 = {value: precisionRound(bitShift(9)*0.1, 1)};
            obj.wind_max10 = {value: obj.wind_ave10.value + precisionRound(bitShift(9)*0.1, 1)};
            obj.wind_min10 = {value: obj.wind_ave10.value - precisionRound(bitShift(9)*0.1, 1)};
            obj.wir_ave10 = {value: precisionRound(bitShift(9)*1, 1)};
            obj.wir_max10 = {value: precisionRound(bitShift(9)*1, 1)};
            obj.wir_hi10 = {value: precisionRound(bitShift(8)*1, 1)};
            obj.wir_lo10 = {value: precisionRound(bitShift(8)*1, 1)};
            
            return obj;
        }
        return Decoder(data);
    }
    return JSON.stringify(decodeMeteoWindPayload(hexToBytes(code)));
}