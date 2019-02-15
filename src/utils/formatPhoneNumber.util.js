export function formatPhoneNumber(tel) {
    var C = tel.replace(/[^0-9xX]/g, "").replace(/[xX]/g, "x");
    var B = "";
    if (C.indexOf("x") > -1) {
        B = " " + C.substr(C.indexOf("x"));
        C = C.substr(0, C.indexOf("x"))
    }
    if (C.length === 10) return C.replace(/(...)(...)(....)/g, "($1) $2 $3") + B;
    if (C.length === 11) return C.replace(/(....)(...)(...)/g, "($1) $2 $3") + B;
    return tel;
}