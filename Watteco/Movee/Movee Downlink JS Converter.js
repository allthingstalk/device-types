function converter(code) {
    var given_obj = JSON.parse(code);
    if ('RawDownlink' in given_obj) {
        return given_obj.RawDownlink.value;
    }
}