function converter(code) {
    var given_obj = JSON.parse(code);
    if ('Output' in given_obj) {
        var value;
        if (given_obj.Output.value === "true") {
            value = 0x00;
        }
        if (given_obj.Output.value === "false") {
            value = 0x01;
        }
        // // This feature isn't used as it's better to have a boolean asset instead of a string one, but it's there.
        // if (given_obj.Output.value == "TOGGLE") {
        //     value = 0x02;
        // }
        var bytes = [0x11, 0x50, 0x00, 0x06, value];
        return bytes;
    }
    if ('RawDownlink' in given_obj) {
        return given_obj.RawDownlink.value;
    }
    return "Error";
}