export default function pageNavigation(pageNumber, totalOffPage , data) {
    const start = ((pageNumber - 1)*totalOffPage);
    const end = start + totalOffPage - 1;
    let result = [];
    for (let i = start; i <= end && data[i] !== undefined; ++i) {
        result.push(data[i]);
    }
    return result;
}