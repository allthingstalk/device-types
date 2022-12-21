function converter(code) {
    function hexToBytes(hex) {
        for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
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
            
            if(bytes.length != 10) return {"status": "ERROR", "description": "10 bytes are required"};
 
            var obj = {};
            obj.index = {value: precisionRound(bitShift(8)*1, 1)};
            obj.battery = {value: precisionRound(bitShift(3)*0.2+3, 1)};
            obj.wind_ave = {value: precisionRound(bitShift(9)*0.1, 1)};
            obj.wind_3sgust = {value: obj.wind_ave.value + precisionRound(bitShift(9)*0.1, 1)};
            obj.wind_3smin = {value: obj.wind_ave.value - precisionRound(bitShift(9)*0.1, 1)};
            obj.wind_stdev = {value: precisionRound(bitShift(8)*0.1, 1)};
            obj.dir_ave = {value: precisionRound(bitShift(9)*1, 1)};
            obj.dir_3sgust = {value: precisionRound(bitShift(9)*1, 1)};
            obj.dir_stdev = {value: precisionRound(bitShift(7)*1, 1)};
            obj.gust_time = {value: precisionRound(bitShift(7)*5, 1)};
            obj.vector_scalar = {value: precisionRound(bitShift(1)*1, 1)};
            obj.alarm_sent = {value: precisionRound(bitShift(1)*1, 1)}; 
            
            return obj;
        }
        return Decoder(data);
    }
    return JSON.stringify(decodeMeteoWindPayload(hexToBytes(code)));
}