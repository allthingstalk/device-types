function converter(code) {
    var att_in = JSON.parse(code);
    if ('Output' in att_in) {
        if (att_in.Output.value == true || att_in.Output.value == 'true') {
            return '1150000601';

        }
        if (att_in.Output.value == false || att_in.Output.value == 'false') {
            return '1150000600';
        }
    }
    if ('RawDownlink' in att_in) {
        return att_in.RawDownlink.value;
    }
    return;
}