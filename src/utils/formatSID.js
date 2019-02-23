export function formatSID(sid) {
    const value = +sid;
    if (value < 10) return `0${value}`;
    return value;
}