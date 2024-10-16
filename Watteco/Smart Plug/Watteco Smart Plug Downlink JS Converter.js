function converter(code) {
    var att_in = JSON.parse(code);
    var att_out = new Object();
    if ('Output' in att_in) {
        if (att_in.Output.value == true || att_in.Output.value == 'true') {
            att_out.data = '1150000601';

        }
        if (att_in.Output.value == false || att_in.Output.value == 'false') {
            att_out.data = '1150000600';
        }
        // // This feature isn't used as it's better to have a boolean asset instead of a string one, but it's there.
        // if (given_obj.Output.value == "TOGGLE") {
        //     att_out.data = '1150000602';
        // }
    }
    if ('RawDownlink' in att_in) {
        att_out.data = att_in.RawDownlink.value;
    }
    att_out.meta = { confirmed: true, port: 125 };
    return JSON.stringify(att_out);
}