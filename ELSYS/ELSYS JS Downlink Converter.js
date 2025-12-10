function converter(code) {
    var att_in = JSON.parse(code);
    var att_out = new Object();
    if ('raw_downlink' in att_in) {
        att_out.data = att_in.raw_downlink.value;
    }
    att_out.meta = { confirmed: false, port: 6 };
    return JSON.stringify(att_out);
}